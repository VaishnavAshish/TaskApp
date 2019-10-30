var express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
var userModel = require('../Models/user');

exports.openForgetPassView = function(req, res){
    res.render('forgetPass',{message : ''});
}

exports.resetPassword = function(req, res){
    console.log('req.body.email'+req.body.email);
    var isExistingUser = isUserExist(req.body.email);
    console.log('-----'+isExistingUser);
    var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    if(isExistingUser){
      userModel.findAll(
          {where : {email : req.body.email}}
      ).then(function(result){
          if(result.length > 0){
            updateToken(token,req.body.email);
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'ashish.vaishnav@athenalogics.com',
                pass: 'AthenaAshish@'
              }
          });
      
          // send mail with defined transport object
          
          let info = transporter.sendMail({
              from: "ashish.vaishnav@athenalogics.com",
              to: req.body.email,
              subject: 'Password Set Process ✔', // Subject line
              text: 'Hello world', // plain text body
              html: `<b>secure Token : `+token+`
              use this token to reset your password
              click on this link to reset : http://localhost:3000/updatePass
              </b>` // html body
          });
          req.session.destroy();
          res.render('login',{error:'check your email to procees further',url:''});
        }
      })
    }else{
      res.render('forgetPass',{message:'This mail is not registered'});
    }
}

exports.openResetPage = function(req, res){
    res.render('resetPassForm',{message : ''});
}

exports.updatePassword = function(req, res){
  userModel.findOne({
    where: {email :req.body.email}
  })
  .then(function(result){
    if(result.token == req.body.secureToken){
      userModel.update(
        {password: req.body.password},
        {where : {email : req.body.email}}
      )
      .then(function(rowsUpdated) {
        req.session.destroy();
        res.render('login',{error:'Password successfully change, Login to Continue',url:''});
      })  
    }else{
      res.render('resetPassForm', {message : 'security token not match'});
    }
  })
}
function isUserExist(userEmail){
  return true;
  console.log('userEmail');
  console.log(userEmail);
  userModel.findAll(
    {where : {email : userEmail}}
  )
  .then(function(result){
      if(result.length > 0){
          return true;
      }else{
          return false;
      }
  })
}

function updateToken(tkn, emailId){
  userModel.update(
    {token : tkn},
    {where : {email : emailId}}
  )
}


