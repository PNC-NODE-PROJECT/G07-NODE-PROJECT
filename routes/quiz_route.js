const express = require('express');
const router = express.Router();
const model = require("../model/quiz_model");
const quizModel = model.quizModel;
const questionModel = model.questionModel;



// +++++++++++++ CREATE NEW QUIZ ++++++++++++++//
router.post("/create", (req, res) => {
    quizModel.create(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ GET ALL QUIZZES ++++++++++++++//
router.get("/", (req, res) => {
    quizModel.find()
        .populate("authorID")
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ GET A TITLE QUIZZES ++++++++++++++//
router.get("/title/:_id", (req, res) => {
    quizModel.findOne({"_id": req.params._id})
        // .populate("authorID")
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})


// +++++++++++++ DELETE A QUIZ ++++++++++++++//
router.delete("/:quizID", (req, res) => {
    quizModel.deleteOne({ _id: req.params.quizID}).then(

        questionModel.deleteMany({ quizID: req.params.quizID})
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            })
    ).catch((error) => {
        res.send(error);
    })

})


// +++++++++++++ UPDATE A QUIZ ++++++++++++++//
router.put("/:quizID", (req, res) => {
    quizModel.updateOne({ _id: req.params.quizID},
        { "title": req.body.title })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ GET A QUESTION IN ONE QUIZ ++++++++++++++//
router.get("/question/:questionID", (req, res) => {
    questionModel.findOne({ _id: req.params.questionID })
        // .populate("quizID")
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ GET ALL QUESTIONS IN ONE QUIZ ++++++++++++++//
router.get("/:quizID", (req, res) => {
    questionModel.find({ quizID: req.params.quizID })
        .populate("quizID")
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ CREATE A NEW QUESTION ++++++++++++++//
router.post("/question", (req, res) => {
    questionModel.create(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ DELETE A QUESTION ++++++++++++++//
router.delete("/question/:questionID", (req, res) => {
    questionModel.deleteOne({ _id: req.params.questionID})
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    })
})

// +++++++++++++ UPDATE A QUESTION ++++++++++++++//
router.put("/question/:questionID", (req, res) => {
    let data = { "title": req.body.title,"choices":req.body.choices,"correct":req.body.correct,"score":req.body.score, "quizID":req.body.quizID};
    questionModel.updateOne({ _id: req.params.questionID}, data)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// send mail to user
const sendMail = require('../mail/send_score');

// SEND MAIL REQUEST
router.post('/send/score', (req, res)=>{
    let data = req.body;
    sendMail.sendScoreToPlayer(data.title, data.score, data.totalScore, data.email)
})


module.exports = router;