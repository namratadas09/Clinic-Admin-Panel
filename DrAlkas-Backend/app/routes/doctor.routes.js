module.exports = app => {
    const doctors = require("../controllers/doctors.js")

    var router = require("express").Router();

    // Get doctor details patient
    router.get("/doctors", doctors.getDoctorDetails);

    //  Create new doctor details
    router.post("/doctors", doctors.doctorDetails);

    //  Update doctor details
    router.put("/doctors/:id", doctors.updateDetails);

    //  Delete doctor details
    router.delete("/doctors/:id", doctors.deleteDetails);

    app.use("/", router);
};
