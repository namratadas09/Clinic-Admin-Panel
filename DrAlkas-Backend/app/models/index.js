const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
 db.user = require("./usermodel.js")(mongoose);
 db.product = require("./productsModel.js")(mongoose);
 db.patients = require("./patientsModel.js")(mongoose);
 db.appointment = require("./appointmentModel.js")(mongoose);
 db.clinic = require("./clinicModel.js")(mongoose);
 db.discount = require("./discountModel.js")(mongoose);
 db.doctor = require("./doctorsModel.js")(mongoose);

module.exports = db;