const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verify')
const {AddProduct,MyProducts,EmptyProds} = require('../controller/ProdController')
router.post('/addProd',verifyToken,AddProduct);
router.get("/emptyProd/",verifyToken,EmptyProds)
router.get('/myProd/:userId',verifyToken,MyProducts);
module.exports = router;