const express = require('express');
const router = express.Router();
var userModel = require('../Models/user');
var jwt = require('../jwtToken');

exports.registerNewUser = function(req, res){
    var payload = {
        password : req.body.password
    };
    var newUser = {
        name: req.body.username, 
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        jwtToken: jwt.sign(payload)
    }
    console.log(newUser);
    userModel.findAll({
        where: {email:req.body.email}
    })
    .then(function(result){
        if(result.length == 0){
            userModel.create(newUser)
            .then(function(result){
                res.redirect('/');
                console.log('user created');
                //res.end(JSON.stringify(result));
            })
        }
        else{
            console.log('user exists');
            res.render('login',{
                error : 'Email already exist please login.',
                url:''
            });
        }
    })
}
