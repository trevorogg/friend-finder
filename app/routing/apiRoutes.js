//dependencies
const server = require('../../server');
const users = require('../../app/data/friends.json');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/api/friends", function (req, res) {
    return res.json(users.surveyResults);
});

router.post("/api/friends", function (req, res) {
    let newFriend = req.body;
    console.log(newFriend);

    let answers = newFriend.scores;

    let friendName = "";
    let friendImg = "";

    let total = 500;


    for (let i = 0; i < users.surveyResults.length; i++) {
        let diff = 0;
        let difference = [];

        for (let j = 0; j < answers.length; j++) {
            let diff = Math.abs(answers[j] - users.surveyResults[i].scores[j]);
            difference.push(diff);
        }
        console.log(difference);
        let sum = difference.reduce(function (acc, val) { return acc + val; });
        console.log("sum is " + sum)
        if (sum < total) {
            total = sum;
            sum = 0;
            friendName = users.surveyResults[i].name;
            friendImg = users.surveyResults[i].image;
        } else {
            sum = 0;
        }
    }
    //adds new user to API
    users.surveyResults.push(newFriend);

    //rewrites JSON file to store users
    fs.writeFile(__dirname + "/../data/friends.json", `{"surveyResults": ${JSON.stringify(users.surveyResults)}}`, function (err) {
        if (err) throw err;
        console.log(JSON.stringify(users.surveyResults))
        console.log('file updated')
    });

    //pushed results back for html page to use
    res.json({
        friendName: friendName,
        friendImg: friendImg
    });
});

module.exports = router;