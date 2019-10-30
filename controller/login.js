const express = require('express');
var jwt = require('../jwtToken');
const router = express.Router();
var userModel = require('../Models/user');
var socialSignInWithGoogle = require('../controller/google-util');
var url = require('url');

exports.registerGet = function(req, res){
    res.render('register',{error:''});
}

exports.authorizeUser = function(req, res){
    var adminId;
    userModel.findOne({
        order: [ [ 'id', 'ASC' ]]
    })
    .then(function(result){
        if(result != null){
            adminId = result.id;
            loginAuth(req, res, adminId);
        }
    });

}

function loginAuth(req, res, adminId){
    userModel.findOne({
        where: {email :req.body.email}
    })
    .then(function(result){
        if (result == null){
            res.render('register', {error : 'User does not exist! please register first.'})
        }
        else {
            if(jwt.decode(result.jwtToken).payload.password == req.body.password){
                console.log(req.session);
                req.session.loggedIn = true;
                req.session.userId = result.id;
                req.session.name = result.name;
                req.session.email = result.email;
                if(result.id == adminId){
                    //res.render('dashboard');
                    req.session.isAdmin = true;
                    res.redirect('/dashboard');
                }
                else{
                    req.session.isAdmin = false;
                    res.redirect('/createTaskList');
                }
            }
            else{
                res.render('login', {error : 'wrong password',url:''});
            }
        }
    })
}


exports.sessionCheck = function(req, res, next){
    console.log('=====sesion check========');
    if(req.session.loggedIn != undefined && req.session.loggedIn){
        if(req.originalUrl == '/'){
            if(req.session.isAdmin){
                res.redirect('/dashboard');
            }else{
                res.redirect('/createTaskList');
            }    
        }
        if(req.session.isAdmin){
            next();
        }else if(req.originalUrl == '/dashboard'){
            res.send('You are not admin');
        }else{
            next();
        }
    }else{
        console.log('=====sesion not found========');
        var q = url.parse(req.originalUrl, true);
        console.log('+++++++++++++++');
        console.log(q);
        if(req.originalUrl == '/updatePass' || req.originalUrl == '/auth' || req.originalUrl == '/register' || req.originalUrl == '/ForgotPassword' || req.originalUrl == '/resetPass'){
            next();
        }
        /*else if(q.pathname != undefined && q.pathname == '/authGoogleSignIn'){
            getGoogleAccountFromCode(q.search);
        }*/
        else{
            if(q.pathname == '/authGoogleSignIn'){
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                next();
            }else{
                res.render('login',{error:'',url:socialSignInWithGoogle.urlGoogle()});
            }
        }    
    }
}

exports.loginGet = (req, res) => res.render('login', {error : 'Welcome!',url:''});

exports.authGoogleAcc = function(req, res){
    var q = url.parse(req.originalUrl, true);
    
    var url_parts = url.parse(req.originalUrl, true);
    var query = url_parts.query;
    console.log('!!!!!!!!!!!!!!url_parts');
    console.log(url_parts);
    console.log('!!!!!!!!!!!!!!!!!query');
    console.log(query.code);
    var obj = socialSignInWithGoogle.getGoogleAccountFromCode(query.code);
    console.log('------------obj--------------');
    console.log(obj);
    res.send('Response received');
}
