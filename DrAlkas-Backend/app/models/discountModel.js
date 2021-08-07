const mongoose = require('mongoose');
module.exports = mongoose => {
  var discountSchema = mongoose.Schema(
    {
      discount_id: { type: Number },
      clinic: { type: Number },
      product: { type: Number },
      discount_name: { type: String },
      discount_desc: { type: String },
      discount_percentage: { type: Number },
      discount_validity: { type: Array }
    });
  const discountModel = mongoose.model("discounts", discountSchema);
  return discountModel;
};