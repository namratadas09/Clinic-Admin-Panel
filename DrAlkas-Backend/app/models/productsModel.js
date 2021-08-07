var autoIncrement = require('mongoose-auto-increment');
module.exports = mongoose => {
  var productSchema = mongoose.Schema(
    {
      product_name: { type: String },
      product_description: { type: String },
      product_price: { type: Number },
      product_discount: { type: Number },
      clinic: { type: Number },
    });
  autoIncrement.initialize(mongoose.connection)
  productSchema.plugin(autoIncrement.plugin, {
    model: "products", // collection or table name in which you want to apply auto increment
    field: "product_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1

  });
  const productModel = mongoose.model("products", productSchema);
  return productModel;
};