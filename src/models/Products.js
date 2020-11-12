
const AModel = require('../models/AModel');

class ProductsModel extends AModel {

    constructor(){
        super();
        this.DB = require('../db')['Products'];
        this.SCHEMA = {
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
    }
}

module.exports = ProductsModel;