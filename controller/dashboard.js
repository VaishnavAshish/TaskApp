const express = require('express');
const router = express.Router();
var userModel = require('../Models/user');
var taskListModel = require('../Models/taskList');
var taskModel  = require('../Models/task');
//response.render('dashboard');
exports.openDashboard = function(req, res){
    var usersWithTaskList = [];
    userModel.findAll(
        {include: 
            [
                {
                    model : taskListModel,
                    include: [
                        taskModel
                      ] 
                }
            ]
        }
    )
    .then(function(results){
        //console.log(results[0].TaskLists[0].Tasks);
        
        for(var i=0;i<results.length;i++){
            var user = {};
            var userDetail = {};
            userDetail.email = results[i].email;
            userDetail.name = results[i].name;
            user.userDetail = userDetail;
            user.taskListLength = results[i].TaskLists.length;
            var taskListCount = 0;
            for(var j=0;j<results[i].TaskLists.length;j++){
                taskListCount = taskListCount + results[i].TaskLists[j].Tasks.length;
            }
            user.taskLength = taskListCount;
            usersWithTaskList.push(user);
        }
        console.log('----------------------------------');
        console.log(usersWithTaskList);
        res.render('dashboard',{
            userDetails : usersWithTaskList,
            userEmail: req.session.email
        });
    })

}

exports.moveToTaskList = function(req, res){
    res.redirect('/createTaskList');
}

