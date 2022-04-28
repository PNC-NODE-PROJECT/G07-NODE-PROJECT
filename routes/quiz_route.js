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











module.exports = router;