
const Model = require('../models/Products');
const MODEL = new Model();

const ERROR_NotFound = 'The product does not exist';

function _assertRecordExists(id, res) {
    const record = MODEL.getById(id);
    if (!record){
        res.status(404);
        throw ERROR_NotFound;
    }
}

module.exports = {

    getAll(req, res) {
        res.status(200).send(MODEL.all());
    },

    getById(req, res) {
        const id = req.params.id;
        const record = MODEL.getById(id);
        if (record){
            res.status(200).send(record);
        } else {
            res.status(404);
            throw ERROR_NotFound;
        }
    },

    post(req, res) {
        MODEL.create(req.body);
        res.status(201).send('Success! New product was added.');
    },

    delete(req, res) {
        _assertRecordExists(req.params.id, res);
        MODEL.delete(req.params.id);
        res.status(204);
    },

    put(req, res) {
        MODEL.replace(req.body);
        res.status(200).send('Success! The product was replaced');
    },

    patch (req, res) {
        _assertRecordExists(req.body.id, res);
        MODEL.edit(req.body);
        res.status(200).send('Success! The product was modified');
    },

    patchById(req, res) {
        _assertRecordExists(req.params.id, res);
        req.body.id = req.params.id;
        MODEL.edit(req.body);
        res.status(200).send('Success! The product was modified');
    }
};