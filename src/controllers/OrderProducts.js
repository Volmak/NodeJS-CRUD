
const ProductsModel = require('../models/Products');
const OrdersModel = require('../models/Orders');
const PRODUCTS_MODEL = new ProductsModel();
const ORDERS_MODEL = new OrdersModel();

const ERROR_OrderNotFound = "The order does not exist";
const ERROR_OrderNoProducts = "The order does not contain products";
const ERROR_ProductNotInOrder = "The order does not contain this product";
const ERROR_ProductNotFound = "The product does not exist";

function _assertOrderExists(order, res) {
    if (!order){
        res.status(404);
        throw ERROR_OrderNotFound;
    }
}

function _assertOrderHasProducts(order, res) {
    if (!order.products){
        res.status(404);
        throw ERROR_OrderNoProducts;
    }
}

function _assertProductInOrder(order, product, res) {
    _assertOrderHasProducts(order, res);
    if (order.products.indexOf(product) < 0){
        res.status(404);
        throw ERROR_ProductNotInOrder;
    }
}

module.exports = {

    getAll(req, res, next) {
        const order = ORDERS_MODEL.getById(req.params.ordId);
        _assertOrderExists(order, res);
        _assertOrderHasProducts(order, res);
        res.status(200).send(PRODUCTS_MODEL.filter('id', order.products));
    },

    getById(req, res, next) {
        const order = ORDERS_MODEL.getById(req.params.ordId);
        _assertOrderExists(order, res);
        const prodId = parseInt(req.params.prodId);
        _assertProductInOrder(order, prodId, res);

        res.status(200).send(PRODUCTS_MODEL.getById(prodId));
    },

    addNewProduct(req, res, next) {
        const productId = PRODUCTS_MODEL.create(req.body);
        ORDERS_MODEL.addProduct(req.params.ordId, productId)
        res.status(201).send('Success! New record was added.');
    },

    addExistingProduct(req, res, next) {
        const productId = parseInt(req.params.prodId);
        const product = PRODUCTS_MODEL.getById(productId)
        if (product){
            ORDERS_MODEL.addProduct(req.params.ordId, productId)
            res.status(201).send('Success! New record was added.');
        } else {
            res.status(404);
            next(ERROR_ProductNotFound);
        }
    },

    delete(req, res, next) {
        const ordId = parseInt(req.params.ordId);
        const order = ORDERS_MODEL.getById(ordId);
        _assertOrderExists(order, res);
        
        const product = parseInt(req.params.prodId);
        _assertProductInOrder(order, product, res);
        
        ORDERS_MODEL.removeProduct(ordId, product);
        res.status(204);
    }
}