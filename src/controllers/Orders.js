
const CrudController = require('./CrudController');

class OrdersController extends CrudController{
    constructor(){
        const Model = require('../models/Orders');
        super(new Model());
    }
}
module.exports = OrdersController;