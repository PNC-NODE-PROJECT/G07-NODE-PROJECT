const express = require('express');
const router = express.Router();
const model = require("../model/quiz_model");

const userModel = model.userModel;
// var session;

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
                // res.send(result[0]);
                session=req.session;
                req.session.userId = result[0].email;
                console.log(req.session)
                // console.log(req.session.userId);
                console.log('Session store');
                // res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
                res.send('Successfull');
            }else{
                // res.send('User not found!')
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

// +++++++++++++ GET USER BY ID++++++++++++++//
router.get('/id/:id', (req, res)=>{
    userModel.findOne({"_id": req.params.id})
    .then((result)=>{
        res.send(result);
    })
})


// +++++++++++++ GET USER ++++++++++++++//
router.get("/email", (req, res) => {
    res.send(req.session.userId)
    console.log(req.session.userId);
})
// router.get('/hi',(req,res) => {
//     session=req.session;
//     console.log(session.userId);
//     if(session.userId){
//         res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     }else
//     res.redirect('/views/register/register.html');
// });

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
