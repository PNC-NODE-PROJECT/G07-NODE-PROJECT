const express = require('express');
const router = express.Router();
const model = require("../model/quiz_model");

const userModel = model.userModel;

// +++++++++++++ CREATE A NEW USER ++++++++++++++//
router.post("/register", (req, res) => {
    const user = {"first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email,
                "password": req.body.password
                }
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
                let userId  = result[0]._id.toHexString();
                req.session.userId = userId;
                console.log('Session stored');
                res.send(userId);
            }else{
                console.log('Session not store');
            }
        })
        .catch((error) => {
            res.send(error);
        })
})

// +++++++++++++ GET USER BY EMAIL++++++++++++++//
router.get('/email/:email', (req, res)=>{
    userModel.findOne({"email": req.params.email})
    .then((result)=>{
        res.send(result);
    })
})

// ++++++++++ CHECK USER HAS LOGIN OR NOT ++++++++++ //
const sessionChecker = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('public/views/register/register.html')
    }else{
        next();
    }
}

// +++++++++++++ GET USER BY ID++++++++++++++//
router.get('/id/:id',sessionChecker, (req, res)=>{
    userModel.findOne({"_id": req.params.id})
    .then((result)=>{
        res.send(result);
    })
})

// +++++ GET SESSION STORED ++++ //
router.get("/session/stored", (req, res) => {
    res.send(req.session.userId)
})

router.get('/logout',sessionChecker,(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// add this inside your route
module.exports = router;
