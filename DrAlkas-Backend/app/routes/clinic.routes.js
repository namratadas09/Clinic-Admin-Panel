module.exports = app => {
    const clinic = require("../controllers/clinic.js")
    var router = require("express").Router();

    // Get clinic details
    router.get("/clinic", clinic.getClinicName);

    //  Create new clinic
    router.post("/clinic", clinic.postClinicDetails);

    //  Update clinic details
    router.put("/clinic/:id", clinic.updateDetails);

    //  Delete clinic details
    router.delete("/clinic/:id", clinic.deleteDetails);

    app.use("/", router);
};
