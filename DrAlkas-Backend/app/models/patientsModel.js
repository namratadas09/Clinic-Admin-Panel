const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
module.exports = mongoose => {
  var patientSchema = mongoose.Schema(
    {
      patient_name: { type: String },
      address: { type: String },
      phone_number: { type: Number },
      email: { type: mongoose.SchemaTypes.Email, correctTld: true },
      patient_status: { type: Boolean },
      doctor_id: { type: Number },
      clinic_id: { type: Number },
      appointment_id: { type: Number },
      products_id: { type: Number }
    });
  autoIncrement.initialize(mongoose.connection)
  patientSchema.plugin(autoIncrement.plugin, {
    model: "patients", // collection or table name in which you want to apply auto increment
    field: "patient_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1

  });
  const patientModel = mongoose.model("patients", patientSchema);
  return patientModel;
};