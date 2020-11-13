
const ProductsModel = require('../models/Products');
const OrdersModel = require('../models/Orders');
const PRODUCTS_MODEL = new ProductsModel();
const ORDERS_MODEL = new OrdersModel();

module.exports = {

    getAll(req, res) {
        const order = ORDERS_MODEL.getById(req.params.ordId);
        if (order && order.products){
            res.send(PRODUCTS_MODEL.filter('id', order.products));
        }
    },

    getById(req, res) {
        const order = ORDERS_MODEL.getById(req.params.ordId);
        const prodId = parseInt(req.params.prodId);

        if (order.products.indexOf(prodId) > -1){
            res.send(PRODUCTS_MODEL.getById(prodId))
        } else {
            res.send('The order does not contain this product')
        };
    },

    addNewProduct(req, res) {
        const productId = PRODUCTS_MODEL.create(req.body);
        ORDERS_MODEL.addProduct(req.params.ordId, productId)
        res.send('Success! New record was added.');
    },

    addExistingProduct(req, res) {
        const productId = parseInt(req.params.prodId);
        const product = PRODUCTS_MODEL.getById(productId)
        if (product){
            ORDERS_MODEL.addProduct(req.params.ordId, productId)
            res.send('Success! New record was added.');
        } else {
            res.send('The product does not exist');
        }
    },

    delete(req, res) {
        ORDERS_MODEL.removeProduct(
            parseInt(req.params.ordId), 
            parseInt(req.params.prodId)
        )
        res.send('Success! The record was deleted.');
    }
}