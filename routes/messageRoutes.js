const express = require ('express');
router = express.Router();
controller = require ('../controller/messageController');


router.post('/get',controller.get);


module.exports =router;