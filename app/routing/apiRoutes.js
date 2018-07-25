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
    //establishes a value that the resulting sum will always be less than, to get into if statement
    let total = 500;


    for (let i = 0; i < users.surveyResults.length; i++) {
        let diff = 0;
        //new array with the difference values
        let difference = [];

        for (let j = 0; j < answers.length; j++) {
            //takes absolute value of differences
            let diff = Math.abs(answers[j] - users.surveyResults[i].scores[j]);
            //pushes difference to new array
            difference.push(diff);

        }
        console.log(difference);
        //adds up the sum of all values in the difference array
        let sum = difference.reduce(function (acc, val) { return acc + val; });
        console.log("sum is " + sum)
        //checks each friend against a total, and the lowest total difference will be the resulting friend
        if (sum < total) {
            //establishes the new total difference to beat
            total = sum;
            //resets the sum each loop
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