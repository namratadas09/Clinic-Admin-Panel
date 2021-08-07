const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

module.exports = mongoose => {
  var clinicSchema = mongoose.Schema(
    {
      name: { type: String },
      clinic_address: { type: String },
      clinic_status: { type: Boolean },
      created_date: { type: Date, default: Date.now() },
      clinic_id: { type: Number },
    });
  autoIncrement.initialize(mongoose.connection)
  const clinicModel = mongoose.model("clinic", clinicSchema);
  return clinicModel;
};