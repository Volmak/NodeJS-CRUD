
const Model = require('../models/Products');
const model = new Model();

const controller = {
    
    get: (req, res) => {
        const id = req.params.id;
        let result;
        if (id) {
            result = model.getById(id);
        } else {
            result = model.all();
        }
        res.send(result);
    },

    post: (req, res) => {
        model.create(req.body);
        res.send('Success! New record was added.'); //no fails
    },

    delete: (req, res) => {
        model.delete(req.params.id);
        res.send('Success! The record was deleted.'); //no fails
    },

    put: (req, res) => {
        model.replace(req.body);
        res.send('Success! The record was replaced'); //no fails
    },

    patch: (req, res) => {
        model.edit(req.body);
        res.send('Success! The record was modified'); //no fails
    }
};

module.exports = controller;