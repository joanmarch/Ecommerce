const express = require ('express');
router = express.Router();
controller = require ('../controller/purchaseController');


router.post('/order',controller.order);


module.exports =router;