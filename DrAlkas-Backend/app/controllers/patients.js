const db = require("../models");
const patientModel = db.patients;

const getPatientDetails = async (req, res, next) => {
    await patientModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        return res.status(200).json(data);
    })


}
const patientDetails = function (req, res) {
    const patientDetails = new patientModel(req.body);
    patientDetails.save((error, response) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        return res.status(200).json('New Patient created succesfully')

    })
}
const updateDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    await patientModel.findByIdAndUpdate(id, updates, options, function (error, data) {
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
    await patientModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}

const getPatientHistory = async (req, res) => {
    let id = req.params.id
    if (!id) {
        return res.status(500).json({ error: 'Missing patient id' })
    } else if (isNaN(id)) {
        return res.status(500).json({ error: 'Invalid patient id' })
    }
    id = parseInt(id)
    let promises = [
        getDoctorDetails(id),
        getClinicDetails(id),
        getProductDetails(id)
    ]
    Promise.all(promises).then((resData) => {
        let result = {};
        let error = ''
        resData.forEach(data => {
            if (!data || !data.length) {
                error = `No record found for the patient Id ${id}`
            } else {
                delete data[0]._id;
                let key = Object.keys(data[0])[0]
                let obj = data[0][key][0]
                result = { ...result, ...obj };
            }
        });
        if (error) {
            return res.status(500).json({ success: false, error: error })
        }

        return res.status(200).json({ success: true, data: result })
    });
}

function getDoctorDetails(patientId) {
    return patientModel.aggregate([
        {
            $match: {
                "patient_id": patientId
            }
        },
        {
            $lookup:
            {
                from: "doctors",
                localField: "doctor_id",
                foreignField: "id",
                as: "doctor"
            }
        },

        {
            $project: { "doctor.doctor_name": 1 }
        }
    ]);
}

function getClinicDetails(patientId) {
    return patientModel.aggregate([
        {
            $match: {
                "patient_id": patientId
            }
        },
        {
            $lookup:
            {
                from: "clinics",
                localField: "clinic_id",
                foreignField: "clinic_id",
                as: "clinic"
            }
        },

        {
            $project: { "clinic.clinic_id": 1 }
        }
    ])
}
function getProductDetails(patientId) {
    return patientModel.aggregate([
        {
            $match: {
                "patient_id": patientId
            }
        },
        {
            $lookup:
            {
                from: "products",
                localField: "products_id",
                foreignField: "product_id",
                as: "product"
            }
        },
        {
            $project: { "product.product_id": 1 }
        }
    ]);
}
exports.getPatientDetails = getPatientDetails;
exports.patientDetails = patientDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;
exports.getPatientHistory = getPatientHistory

