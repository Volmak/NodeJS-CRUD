
const BaseModel = require('../models/BaseModel');
const ProductsModel = new BaseModel('Products');

const controller = {
    
    get: (req, res) => {
        const id = req.params.id;
        let result;
        if (id) {
            result = ProductsModel.getById(id);
        } else {
            result = ProductsModel.all();
        }
        res.send(result);
    },

    post: (req, res) => {
        /* TODO:: Move to the model if more models are created */
        ProductsModel.create({
            name : req.body.name,
            category : req.body.category,
            price : req.body.price
        });
        res.send('Success!'); //no fails
    },

    delete: (req, res) => {
        ProductsModel.delete(req.params.id);
        res.send('Success!'); //no fails
    },

    put: (req, res) => {
        /* TODO:: Move to the model if more models are created */
        ProductsModel.replace({
            id : req.body.id,
            name : req.body.name,
            category : req.body.category,
            price : req.body.price
        });
        res.send('Success!'); //no fails
    },

    patch: (req, res) => {

    }
};

module.exports = controller;