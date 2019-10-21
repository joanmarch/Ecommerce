const express = require ('express');
router = express.Router();
controller = require ('../controller/userController');

router.post('/add',controller.add);
router.post('/login',controller.login);
router.post('/ForgotPassword',controller.ForgotPassword);


router.get('/confirmation/:tokenId', controller.confirmationPost);
router.post('/resetPassword', controller.resetPassword);
router.post('/resend', controller.resendTokenPost);




module.exports =router;
