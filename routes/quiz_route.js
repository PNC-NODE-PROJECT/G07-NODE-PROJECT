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






module.exports = router;