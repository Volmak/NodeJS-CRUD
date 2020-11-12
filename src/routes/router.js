const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

/* TODO: modify the router to work with any controller */
const ProductsController = require('../controllers/Products');

router.get('/Products/', ProductsController.get);
router.get('/Products/:id', ProductsController.get);
router.post('/Products/', ProductsController.post);
router.delete('/Products/:id', ProductsController.delete);
router.put('/Products/', ProductsController.put);


module.exports = router;