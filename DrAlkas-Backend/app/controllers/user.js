const { registerValidation } = require('../helpers/registerValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret";
const rounds = 10;
const db = require("../models");
const userModel = db.user;
const config = require("../config/config.js");
const client = require("twilio")(config.accountSID, config.authToken);
const nodemailer = require('nodemailer');
require('dotenv').config();



const createUser = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else {
        const body = req.body;
        bcrypt.hash(body.password, rounds, (error, hash) => {
            if (error) res.status(500).json(error)
            else {
                const userCollection = new userModel({
                    username: req.body.username, email: req.body.email, address: req.body.address, mobile_no: req.body.mobile_no,
                    validity: req.body.validity, status: 'inactive',
                    password: hash
                })
                userCollection.save((err) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    }
                    res.status(200).json('User created succesfully');
                })
            }
        })
    }
}

const login = async (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, obj) => {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            if (obj == null) {
                return res.status(404).json('Email not found');
            }
            else {
                bcrypt.compare(req.body.password, obj.password, (error, match) => {
                    const token = generateToken({ body: req.body });
                    if (error) res.status(500).json(error)
                    else if (match) res.status(200).json({ token: token })
                    else res.status(403).json({ error: 'passwords donot match' })
                })
            }

        }
    })
}

const generateToken = function (body) {
    return jwt.sign(body, tokenSecret, { expiresIn: '1800s' });
}

const getOtp = async (req, res) => {
    client
        .verify
        .services(config.serviceId)
        .verifications
        .create({
            to: ` +${req.query.phoneNumber}`,
            channel: req.query.channel
        })
        .then((data) => {
            res.status(200).send(data)
        })

}
const verify = async (req, res) => {
    client
        .verify
        .services(config.serviceId)
        .verificationChecks
        .create({
            to: ` +${req.query.phoneNumber}`,
            code: req.query.code
        })
        .then((data) => {
            if (data.valid == true) {
                userModel.findOne({ mobile_no: req.query.phoneNumber }, (err, obj) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    else {
                        if (obj == null) {
                            return res.status(404).json('Phone Number not found');
                        }
                        else {
                            const _id = obj._id;
                            const options = { $set: { status: 'active' } }
                            userModel.findByIdAndUpdate(_id, options, function (error, data) {
                                if (error) {
                                    res.status(500).json({
                                        error: 'No matching id'
                                    })
                                }
                                res.status(200).json('Updated Succesfully');
                            });
                        }
                    }
                });
            }
            else {
                return res.status(400).json('Otp entered in not correct')
            }

        });
}
const sendMail = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: 'namrata.das09@gmail.com',
        to: req.body.email,
        subject: 'Testing',
        text: 'Implemented nodemailer,sending mail for testing'
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error occurs', err)
            res.status(500).send(err);
        } else {
            console.log('Email sent !!!')
            res.status(200).send('Email sent');

        }
    });
}
exports.createUser = createUser;
exports.login = login;
exports.getOtp = getOtp;
exports.verify = verify
exports.sendMail = sendMail