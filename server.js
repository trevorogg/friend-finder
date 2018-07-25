// dependencies
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
const app = express();

// directory for static files
app.use(express.static('public'));

// routing
app.use(require('./app/routing/htmlRoutes.js'));
app.use(require('./app/routing/apiRoutes.js'));

// port declaration
var PORT = process.env.PORT || 3000;

// body-parser config
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app express listener
app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
});

module.exports = router, bodyParser;
