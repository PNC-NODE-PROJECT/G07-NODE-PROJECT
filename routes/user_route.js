const express = require('express');
const router = express.Router();
const model = require("../model/quiz_model");
const userModel = model.userModel;

// +++++++++++++ CREATE A NEW USER ++++++++++++++//
router.post("/register", (req, res) => {
    userModel.create(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ GET USER ++++++++++++++//
router.post("/login", (req, res) => {
    userModel.find(req.body)
        .then((result) => {
            if(result.length > 0){
                res.send(result[0]);
            }else{
                res.send('User not found!')
            }
        })
        .catch((error) => {
            res.send(error);
        })
})


module.exports = router;
