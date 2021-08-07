const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
module.exports = mongoose => {
  var appointmentSchema = mongoose.Schema(
    {
      clinic: { type: String },
      doctor: { type: Number },
      from_time: { type: Date },
      to_time: { type: Date },
      confirmation: { type: Boolean },
    });
  autoIncrement.initialize(mongoose.connection)
  appointmentSchema.plugin(autoIncrement.plugin, {
    model: "appointments", // collection or table name in which you want to apply auto increment
    field: "appointment_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1

  });
  const appointmentModel = mongoose.model("appointment", appointmentSchema);
  return appointmentModel;
};

