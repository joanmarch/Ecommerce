var crypto = require('crypto');
var nodemailer = require('nodemailer');
const userModel = require('../model/userModel');
const Token = require('../model/tokenConfirmationModel');
const TokenReset = require('../model/tokenResetModel');
class userControll{
     add(req, res){
        const {email, password} = req.body;
        var newUser = {
            email,
            password,
        }
        console.log("+++++++++")
        userModel.findOne({ email: req.body.email }, function (err, user) {
            if (!user){
                userModel.create(newUser,(err, user)=>{
                    if (err) {
                        throw new Error(err);
                    }else{
                    
                     // Create a verification token for this user
                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
               
                
                         // Save the verification token
                token.save(async function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
         
                    // Send the email
                    // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
                    var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'joanmarchgarcia@gmail.com', pass: 'Joamar0414' } });
                    var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user/confirmation\/' + token.token + '.\n' };
                    await transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                        res.status(500).send({ msg: err.message }); 
                        }else{
                        // res.status(200).send('A verification email has been sent to ' + user.email + '.');
                        res.send({user, msg : 'A verification email has been sent to ' + user.email + '.' });  
                        }
                    });
                    
                });
                    }
                })
            }else if (user.isVerified) {
                return res.send({ msg: 'This account has already been verified. Please log in.' });
            }else{
                console.log("--------")
                 
                     // Create a verification token for this user
                     var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
               
                
                     // Save the verification token
            token.save(async function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
     
                // Send the email
                // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
                var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'joanmarchgarcia@gmail.com', pass: 'Joamar0414' } });
                var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user/confirmation\/' + token.token + '.\n' };
                await transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                    res.status(500).send({ msg: err.message }); 
                    }else{
                    // res.status(200).send('A verification email has been sent to ' + user.email + '.');
                    res.send({user, msg : 'A verification email has been sent to ' + user.email + '.' }); 
            }
        });
    });

        }
    })
   
    }

    login(req, res){
        const {email, password} = req.body;
        userModel.findOne({email:email, isVerified:true}, (err, data)=>{
            if (err) {
                console.log(error);
                /* throw new Error (err); */
            } else if (data == null){
                res.send({
                    data,
                    "code" : 205,
                    "denied" : "email not existing"
                })
            }else{
            res.send({
                data,
                "code" : 200,
                "success" : "Login successfull"
            });
            }           
        })
    }

    ForgotPassword(req, res){
        const {email} = req.body;
        
        userModel.findOne({email:email, isVerified:true}, (err, user)=>{
            if (err) {
                console.log(error);
                /* throw new Error (err); */
            } else if (user == null){
                res.send({
                    data,
                    "code" : 205,
                    "denied" : "email not existing"
                })
            }else{
                var tokenReset = new TokenReset({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                tokenReset.save(async function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                   
                    var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'joanmarchgarcia@gmail.com', pass: 'Joamar0414' } });
                    var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Link To Reset Password', text: 'Hello,\n\n' + 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link to complete the process within one hour of receiving it: \nhttp:\/\/' + "localhost:3000" + '\/user/resetPassword\/' + tokenReset.token + '.\n' + 'If you did not request this, please ignore this email and your password will remain unchanged' };
                    await transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            
                        res.status(500).send({ msg: err.message }); 
                        }else{
                        // res.status(200).send('A verification email has been sent to ' + user.email + '.');
                      console.log("AAAAAAAAAAAAAAAAAAAAAA")
                        res.send({user, msg : 'A verification email has been sent to ' + user.email + '.' }); 
            }           
        })
    })
}
    })
}

// resetPassword(req, res){
//     const {tokenId} = req.params;

// // Find a matching token
// TokenReset.findOne({ token: tokenId }, function (err, token) {
//     if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });

//     // If we found a token, find a matching user
    
   
//     userModel.findOne({ _id: token._userId}, function (err, user) {
//         // userModel.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
//         if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
//         if (user.isVerified){
//             res.status(200).send("The account has been verified. Please log in.GOOD!");
//         }
//         // } return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
//     });
// });

// }
resetPassword(req, res){
    const {tokenId, password} = req.body;
    let newPassword = password;

    
// Find a matching token
TokenReset.findOne({ token: tokenId }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });

    // If we found a token, find a matching user
           
             userModel.update({ _id: token._userId, isVerified: true},{$set:{
                 password: newPassword,
             }},(err,data)=>{
                 if (err) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                 else res.status(200).send({data,
                                             msg : "Password has been modified"});
             })
            
        })
        // } return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
}

    confirmationPost(req, res){
        const {tokenId} = req.params;
    
    // Find a matching token
    Token.findOne({ token: tokenId }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });
 
        // If we found a token, find a matching user
        
       
        userModel.findOne({ _id: token._userId}, function (err, user) {
            // userModel.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
   
    }

    resendTokenPost(req, res){
        // Check for validation errors    
   var errors = req.validationErrors();
   if (errors) return res.status(400).send(errors);
   // Find a matching token
   userModel.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
    if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

    // Create a verification token, save it, and send email
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

    // Save the token
    token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }

        // Send the email
        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            res.status(200).send('A verification email has been sent to ' + user.email + '.');
           });
       });
   });
  
   }

}

module.exports = new userControll();