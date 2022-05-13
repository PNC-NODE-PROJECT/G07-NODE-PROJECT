require("dotenv").config();
const express = require('express')
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const cors = require('cors');
const PORT = process.env.PORT || 3000
app.use(cors({origin: '*'}));
app.use(express.json())

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrret",
    saveUninitialized:true,
    resave: false,
    cookie: {
        maxAge: oneDay
    }
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

const sessionChecker = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('public/views/register/register.html')
    }else{
        next();
    }
}

app.get('/', sessionChecker, (req,res) => {
    res.sendFile('public',{root:__dirname})
});

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})


const itemRouter = require('./routes/quiz_route');
const userRouter = require('./routes/user_route');
const scoreRouter = require('./routes/score_route');

app.use('/quiz',sessionChecker, itemRouter);
app.use('/user', userRouter);
app.use('/score',sessionChecker, scoreRouter);

app.use(express.static("public"));

app.use(function(req, res, next) {
    if(!req.session.userId){
        res.status(404).redirect('/public/404/index.html');
    }
    res.status(404).redirect('/public');
});