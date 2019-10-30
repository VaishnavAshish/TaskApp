const express = require('express');
const router = express.Router();
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const loginController = require('../controller/login')
const registerController = require('../controller/register')
const dashboardController = require('../controller/dashboard')
const taskListController = require('../controller/taskList')
const forgetPassController = require('../controller/forgetPass')

router.get('/register', loginController.registerGet);
router.get('/', loginController.loginGet);
router.post('/register', registerController.registerNewUser);
router.get('/dashboard', dashboardController.openDashboard);
router.post('/auth', loginController.authorizeUser);
router.post('/createTaskList', taskListController.createTaskList);
router.get('/createTaskList', taskListController.getTaskList);
router.post('/createNewTask', taskListController.createTask);
router.post('/EditTaskList', taskListController.editTaskList);
router.post('/deleteList', taskListController.deleteTaskList);
router.post('/editNewTask', taskListController.editNewTask);
router.post('/deleteTask', taskListController.deleteTask);
router.get('/logout', taskListController.logOutUser);
router.get('/ForgotPassword', forgetPassController.openForgetPassView);
router.post('/resetPass',forgetPassController.resetPassword);
router.get('/updatePass', forgetPassController.openResetPage);
router.post('/updatePass',forgetPassController.updatePassword);
router.post('/changePass', taskListController.changeUserPassword);
router.get('/moveToTaskList', dashboardController.moveToTaskList);
router.get('/authGoogleSignIn', loginController.authGoogleAcc);

module.exports = router;
