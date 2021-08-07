const db = require("../models");
const productModel = db.product;

const getProducts = async (req, res) => {
    await productModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
            }
        return res.status(200).json(data);
    })
}
const productDetails = function (req, res) {
    const productDetails = new productModel(req.body)
    productDetails.save((error, data) => {
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

    await productModel.findByIdAndUpdate(id, updates, options, function (error, data) {
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
    await productModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}

exports.getProducts = getProducts;
exports.productDetails = productDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;