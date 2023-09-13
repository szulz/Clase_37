const express = require('express');
const { PORT } = require('../config/env.config.js');
const ProductController = require('../controllers/product.controller.js');
const productModel = require('../model/schemas/product.schema.js');
const productController = new ProductController
const productRouter = express.Router();
const Auth = require('../middlewares/auth.js');
const auth = new Auth




productRouter.get("/", auth.allowUsersInSession, productController.showAll)

productRouter.get("/stock/:pid", productController.returnStock)

productRouter.get('/create', async (req, res) => {
    res.render('createProduct')
});

//agergar middlewares
productRouter.post('/create', /*auth.isAdmin, */productController.createOne)

module.exports = productRouter;