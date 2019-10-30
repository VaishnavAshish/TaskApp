var taskListModel = require('../Models/taskList');
var taskModel  = require('../Models/task');
var userModel = require('../Models/user');
var jwt = require('../jwtToken');
exports.createTaskList = function(req, res){
    taskListModel.create({
        name: req.body.name,
        userId : req.session.userId
    })
    .then(function(result){
        res.redirect('/createTaskList');
    })
}

exports.getTaskList = function(req, res){
    console.log(req.session);
    taskListModel.findAll(
        {where : {userId : req.session.userId},
        include: 
            [{model : taskModel}]
        }
    )
    .then(function(results){
        console.log('results.length-------'+JSON.stringify( results[0]));
        res.render('taskView',{
            taskList : results,
            userEmail: req.session.email
        });
    })
}

exports.createTask = function(req, res){
    var newTask = {
        name : req.body.TaskName,
        Description: req.body.taskDes,
        TaskStartDate: req.body.startDate,
        TaskEndDate: req.body.endDate,
        TaskListId: req.body.taskListId
    }
    taskModel.create(newTask)
    .then(function(result){
        res.redirect('/createTaskList');
        //res.end(JSON.stringify(result));
    })
    console.log(newTask);
}

exports.editTaskList = function(req, res){
    taskListModel.update(
        {name: req.body.TaskListName},
        {where: {id:req.body.taskListIdForEdit}}
      )
      .then(function(rowsUpdated) {
        res.redirect('/createTaskList');
      })
}

exports.deleteTaskList = function(req, res){
    taskListModel.destroy({
        where: {id : req.body.taskListId}
    })
    .then(function(result){
        res.redirect('/createTaskList');
    })
}

exports.deleteTask = function(req, res){
    taskModel.destroy({
        where: {id : req.body.taskId}
    })
    .then(function(result){
        res.redirect('/createTaskList');
    })
}


exports.editNewTask = function(req, res){
    taskModel.update(
        {
            name : req.body.TaskName,
            Description: req.body.taskDes,
            TaskStartDate: req.body.startDate,
            TaskEndDate: req.body.endDate,
        },
        {where: {id:req.body.taskId}}
      )
      .then(function(rowsUpdated) {
        res.redirect('/createTaskList');
      })
}

exports.logOutUser = function(req, res){
    req.session.destroy();
    res.redirect('/');
}

exports.changeUserPassword = function(req, res){
    console.log('req.session');
    console.log(req.session);
    userModel.findOne(
        {where : {email : req.session.email}}
    )
    .then(function(result){
        console.log('-----result-----'+result.password);
        if(jwt.decode(result.jwtToken).payload.password == req.body.oldPass){
            var payload = {
                password : req.body.newPass
            }
            userModel.update(
                {password : req.body.newPass},
                {jwtToken : jwt.sign(payload)},
                {where : {email : req.session.email}}
            )
            .then(function(result){
                if(req.session.isAdmin){
                    res.redirect('/dashboard');
                }else{
                    res.redirect('/createTaskList');
                }
            })
        }
    })
}
