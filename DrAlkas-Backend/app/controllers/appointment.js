const db = require("../models");
const appointmentModel = db.appointment;

const appointmentDetails = function (req, res) {
    const appointmentDetail = new appointmentModel(req.body)
    appointmentDetail.save((error, data) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        return res.status(200).json(data);
    })
}
const getAppointmentDetails = async (req, res, next) => {
    await appointmentModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        return res.status(200).json(data);
    })
}
const updateAppointmentDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    await appointmentModel.findByIdAndUpdate(id, updates, options, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })
        }
        res.status(200).json('Updated Succesfully');
    });

}

const deleteDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    await appointmentModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}
exports.appointmentDetails = appointmentDetails;
exports.getAppointmentDetails = getAppointmentDetails;
exports.updateAppointmentDetails = updateAppointmentDetails;
exports.deleteDetails = deleteDetails;
