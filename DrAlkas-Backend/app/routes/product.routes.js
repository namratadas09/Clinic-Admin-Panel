module.exports = app => {
    const product = require("../controllers/products.js")
  
    var router = require("express").Router();
  
    // Create new products
    router.post("/products", product.productDetails);
  
    //  Get product details
    router.get("/products", product.getProducts);
  
    app.use("/", router);
  };
  