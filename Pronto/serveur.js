var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');
var stringify = require('json-stringify-safe');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var nspCuisine = io.of('/cuisine');
nspCuisine.on('connection', function(socket){
    console.log('cuisine connected');
    nspCuisine.emit('cuisine', 'Hello cuisine!');
    socket.on('disconnect', function(){
        console.log('cuisine disconnected');
    });
});

var nspBar = io.of('/bar');
nspBar.on('connection', function(socket){
    console.log('bar connected');
    nspBar.emit('bar', 'Hello bar!');
    socket.on('disconnect', function(){
        console.log('bar disconnected');
    });
});




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

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
    console.log("Homepage visiting");
})

app.get('/bar', function (req, res) {
    res.sendFile( __dirname + "/" + "bar.html" );
    console.log("Bar visiting");
})


app.get('/cuisine', function (req, res) {
    res.sendFile( __dirname + "/" + "cuisine.html" );
    console.log("Cuisine visiting");
})





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
    var server = http.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("The server listening at http://%s:%s", host, port)

    })