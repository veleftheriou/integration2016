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

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/db';

var insertDocuments = function(db, callback,data) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert(
        data, function(err, result) {
            console.log("success");
            callback(result);
        });
}


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
    var commande = req.body;
    console.log(commande);

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server database");

        insertDocuments(db, function () {

            db.close();
        }, commande);

    });
}



app.listen(3000,function(){
    console.log("Live at Port 3000");
});

