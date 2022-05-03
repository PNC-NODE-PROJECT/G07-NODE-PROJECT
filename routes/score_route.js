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
// router.get("/", (req, res) => {
//     quizModel.find()
//         .populate("authorID")
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             res.send(error);
//         })
// })

// // +++++++++++++ GET A TITLE QUIZZES ++++++++++++++//
// router.get("/title/:_id", (req, res) => {
//     quizModel.findOne({"_id": req.params._id})
//         // .populate("authorID")
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             res.send(error);
//         })
// })


// // +++++++++++++ DELETE A QUIZ ++++++++++++++//
// router.delete("/:quizID", (req, res) => {
//     quizModel.deleteOne({ _id: req.params.quizID}).then(

//         questionModel.deleteMany({ quizID: req.params.quizID})
//             .then((result) => {
//                 res.send(result);
//             })
//             .catch((error) => {
//                 res.send(error);
//             })
//     ).catch((error) => {
//         res.send(error);
//     })

// })


// // +++++++++++++ UPDATE A QUIZ ++++++++++++++//
// router.put("/:quizID", (req, res) => {
//     quizModel.updateOne({ _id: req.params.quizID},
//         { "title": req.body.title })
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             res.send(error);
//         })
// })


module.exports = router;