const express = require('express');
const router = express.Router();
const model = require("../model/quiz_model");
const scoreModel = model.scoreModel;


// +++++++++++++ CREATE NEW QUIZ ++++++++++++++//
router.post("/", (req, res) => {
    scoreModel.create(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// // +++++++++++++ GET ALL QUIZZES ++++++++++++++//
router.get("/:userID", (req, res) => {
    scoreModel.find({ "userID": req.params.userID })
        .populate("userID")
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// // +++++++++++++ DELETE A SCORE HISTORY ++++++++++++++//
router.delete("/:scoreID", (req, res) => {
    scoreModel.deleteOne({ _id: req.params.scoreID }).then(
        res.send("result")
    ).catch((error) => {
        res.send(error);
    })

})

module.exports = router;