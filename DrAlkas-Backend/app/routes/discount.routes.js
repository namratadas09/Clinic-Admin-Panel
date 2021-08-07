module.exports = app => {
    const discount = require("../controllers/discount.js")
    var router = require("express").Router();
    // Get discount details
    
    router.get("/discount", discount.getDiscount);

    //  Create new discount 

    router.post("/discount", discount.discountDetails);

    //  Update discount details

    router.put("/discount/:id", discount.updateDetails);

    //  Delete discount details

    router.delete("/discount/:id", discount.deleteDetails);

    app.use("/", router);
};
