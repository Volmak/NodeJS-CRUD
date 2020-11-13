
const CrudController = require('./CrudController');

class OrdersController extends CrudController{
    constructor(){
        const Model = require('../models/Products');
        super(new Model());
        const OrdersModel = require('../models/Orders');
        this._ordersModel = new OrdersModel();
    }

    get(req, res) {
        const order = this._ordersModel.getById(req.params.id);
        const relId = parseInt(req.params.relId);
        const filter = isNaN(relId) ? order.products : [relId];
        res.send(this.MODEL.filter('id', filter));
    }

    post(req, res) {
        const relId = parseInt(req.params.relId);
        const productId = relId ? relId : this.MODEL.create(req.body);
        this._ordersModel.addProduct(req.params.id, productId)
        res.send('Success! New record was added.'); //no fails
    }

    delete(req, res) {
        this._ordersModel.removeProduct(parseInt(req.params.id), parseInt(req.params.relId))
        res.send('Success! The record was deleted.'); //no fails
    }

    put(req, res) {
        res.send('not implemented');
    }

    patch (req, res) {
        res.send('not implemented');
    }
}
module.exports = OrdersController;