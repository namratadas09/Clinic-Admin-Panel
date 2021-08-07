module.exports = app => {
    const appointment = require("../controllers/appointment.js")
    var router = require("express").Router();

    // Get  appointment details
    router.get("/appointment", appointment.getAppointmentDetails);

    //  Create new appointment 
    router.post("/appointment", appointment.appointmentDetails);

    //  Update appointment details
    router.put("/appointment/:id", appointment.updateAppointmentDetails);

    //  Delete appointment details
    router.delete("/appointment/:id", appointment.deleteDetails);

    app.use("/", router);
};
