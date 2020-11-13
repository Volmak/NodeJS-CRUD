
const Model = require('../models/Products');
MODEL = new Model();

module.exports = {

    getAll(req, res) {
        res.send(MODEL.all());
    },

    getById(req, res) {
        const id = req.params.id;
        res.send(MODEL.getById(id));
    },

    post(req, res) {
        MODEL.create(req.body);
        res.send('Success! New record was added.'); //no fails
    },

    delete(req, res) {
        MODEL.delete(req.params.id);
        res.send('Success! The record was deleted.'); //no fails
    },

    put(req, res) {
        MODEL.replace(req.body);
        res.send('Success! The record was replaced'); //no fails
    },

    patch (req, res) {
        MODEL.edit(req.body);
        res.send('Success! The record was modified'); //no fails
    },

    patchById(req, res) {
        req.body.id = req.params.id;
        MODEL.edit(req.body);
        res.send('Success! The record was modified'); //no fails
    }
};