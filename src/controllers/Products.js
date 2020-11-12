
const CrudController = require('./CrudController');

class ProductsController extends CrudController{
    constructor(){
        const Model = require('../models/Products');
        super(new Model());
    }
}
module.exports = ProductsController;