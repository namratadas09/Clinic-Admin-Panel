const db = require("../models");
const discountModel = db.discount;

const getDiscount = async (req, res) => {
    await discountModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        return res.status(200).json(data);
    })


}
const discountDetails = function (req, res) {
    const discountDetails = new discountModel(req.body)
    discountDetails.save((error, data) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        return res.status(200).json(data);
    })
}


const updateDetails = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    await discountModel.findByIdAndUpdate(id, updates, options, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })
        }
        res.status(200).json('Updated Succesfully');
    });

}

const deleteDetails = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    await discountModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}

exports.getDiscount = getDiscount;
exports.discountDetails = discountDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;