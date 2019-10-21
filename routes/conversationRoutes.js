const express = require ('express');
router = express.Router();
conversation = require ('../controller/conversationController');


router.post('/get',conversation.get);


module.exports =router;