/**
 * Created by Alex on 5/10/2016.
 */

var express = require("express");
var app = express();
var router = express.Router();
var path = app.use(express.static(__dirname + '/public/'));
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

router.get("/",function(req,res){
    res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
    res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
    res.sendFile(path + "contact.html");
});

app.post("/form",function(req,res){
    res.sendFile(path + "form.html");
});

app.use("/",router);

//router.get("*",function(req,res){
    //res.sendFile(path + "404.html");
//});

app.post('/process_post', function (req, res) {
    reception(req,res);
    console.log('----');
})

function reception(req,res) {
    console.log(req.body);
}


app.listen(3000,function(){
    console.log("Live at Port 3000");
});

