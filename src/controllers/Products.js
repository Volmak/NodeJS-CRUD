
const requestCountry = require('request-country');
const Model = require('../models/Products');
const MODEL = new Model();

const vatRatesUrl = 'https://euvatrates.com/rates.json';
let vatRates;
const https = require('https');

https.get(vatRatesUrl,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            vatRates = JSON.parse(body);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

function _applyVat (product, countryCode){
    if (vatRates && vatRates.rates && 
        vatRates.rates[countryCode] && 
        vatRates.rates[countryCode].standard_rate)
    {
        product.price *= (1 + vatRates.rates[countryCode].standard_rate/100)
    } else {
        product.withoutVat = true;
    }
}

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
        const entityCollection = MODEL.all();
        const countryCode = requestCountry(req);
        const result = entityCollection.map((record) => {
            let copiedRecord = Object.assign({}, record);  
            _applyVat(copiedRecord, countryCode);
            return copiedRecord;
        })
        res.status(200).send(result);
    },

    getById(req, res) {
        const id = req.params.id;
        let record = Object.assign({}, MODEL.getById(id));
        if (record){
            const countryCode = requestCountry(req);
            _applyVat(record, countryCode);
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