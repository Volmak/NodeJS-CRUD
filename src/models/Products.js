
const BaseModel = require('./BaseModel');

class ProductsModel extends BaseModel {

    constructor(){
        const schema = {
            id: {
                type: "Integer",
                mandatory: true
            },
            name: {
                type: "String",
                mandatory: true
            },
            category: {
                type: "String",
                mandatory: true
            },
            price: {
                type: "Float",
                mandatory: true
            }
        }
        super('Products', schema);
    }
}

module.exports = ProductsModel;