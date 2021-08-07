const db = require("../models");
const clinicModel = db.clinic;

const getClinicName = async (req, res, next) => {
    await clinicModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
            }
        return res.status(200).json(data);
    })
}
const postClinicDetails = function (req, res) {
    const clinicDetails = new clinicModel(req.body)
    clinicDetails.save((error, data) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        return res.status(200).json(data);
    })
}


const updateDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    await clinicModel.findByIdAndUpdate(id, updates, options, function (error, data) {
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
    await clinicModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}

exports.getClinicName = getClinicName;
exports.postClinicDetails = postClinicDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;