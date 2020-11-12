
const BaseModel = require('../models/BaseModel');

/* TODO:: Move to the model if more models are created */
const ProductSchema = {
    id: {
        type: "Integer"
    },
    name: {
        type: "String"
    },
    category: {
        type: "String"
    },
    price: {
        type: "Float"
    }
}
const ProductsModel = new BaseModel('Products', ProductSchema);

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
        ProductsModel.create(req.body);
        res.send('Success! New Product was added.'); //no fails
    },

    delete: (req, res) => {
        ProductsModel.delete(req.params.id);
        res.send('Success! The product was deleted.'); //no fails
    },

    put: (req, res) => {
        ProductsModel.replace(req.body);
        res.send('Success! The product was replaced'); //no fails
    },

    patch: (req, res) => {
        ProductsModel.edit(req.body);
        res.send('Success! The product was modified'); //no fails
    }
};

module.exports = controller;