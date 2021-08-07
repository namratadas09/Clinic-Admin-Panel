const db = require("../models");
const doctorsModel = db.doctor;

const getDoctorDetails = async (req, res, next) => {
    await doctorsModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        return res.status(200).json(data);
    })
}

const doctorDetails = function (req, res) {
    const docDetails = new doctorsModel(req.body)
    docDetails.save((error, data) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        return res.status(200).json(data);
    })
}
const updateDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    await doctorsModel.findByIdAndUpdate(id, updates, options, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })
        }
        res.status(200).json('Updated Succesfully');
    });

}
const deleteDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    await doctorsModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}

exports.getDoctorDetails = getDoctorDetails;
exports.doctorDetails = doctorDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;
