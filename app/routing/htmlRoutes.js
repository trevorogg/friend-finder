const server = require('../../server')
const express = require("express");
const router = express.Router();
const path = require("path");

//sends html files
router.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"../public/home.html"))
})

router.get("/survey", function(req,res){
    res.sendFile(path.join(__dirname,"../public/survey.html"))
})

module.exports = router;