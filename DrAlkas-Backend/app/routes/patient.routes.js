module.exports = app => {
    const patients = require("../controllers/patients.js")

    var router = require("express").Router();

    // Create new patient
    router.get("/patients", patients.getPatientDetails);

    //  Get patient details
    router.post("/patients", patients.patientDetails);

    //  Update patient details
    router.put("/patients/:id", patients.updateDetails);

    //  Delete patient details
    router.delete("/patients/:id", patients.deleteDetails);

        //Getting patient History
    router.get("/patientsHistory/:id", patients.getPatientHistory);


    app.use("/", router);
};
