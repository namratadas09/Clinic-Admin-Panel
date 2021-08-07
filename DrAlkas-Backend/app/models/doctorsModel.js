const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
module.exports = mongoose => {
  var doctorsSchema = mongoose.Schema(
    {
      doctor_name: { type: String },
      doctor_qualification: { type: String },
      doctor_dob: { type: Date },
      doctors_home_clinic: { type: Number }
    });
  autoIncrement.initialize(mongoose.connection)
  doctorsSchema.plugin(autoIncrement.plugin, {
    model: "doctors", // collection or table name in which you want to apply auto increment
    field: "id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1

  });
  const doctorsModel = mongoose.model("doctors", doctorsSchema);
  return doctorsModel;
};