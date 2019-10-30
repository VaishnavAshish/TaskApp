var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

const loginController = require('./controller/login');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/', require('./routes/routes.js'));
/*app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));*/
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.listen(3000,function(){
    console.log('server stared on 3000');
})