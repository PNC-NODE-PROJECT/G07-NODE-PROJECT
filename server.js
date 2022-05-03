const express = require('express')
const app = express();
// Additional
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

const cors = require('cors');
const PORT = process.env.PORT || 3000
app.use(cors({origin: '*'}));
app.use(express.json())


// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

app.get('/',(req,res) => {
    if(!req.session.userId){
        res.redirect('public/views/register/register.html')
    }else
    res.sendFile('public',{root:__dirname})
});


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})


const itemRouter = require('./routes/quiz_route');
const userRouter = require('./routes/user_route');


app.use('/quiz', itemRouter);
app.use('/user', userRouter);

app.use(express.static("public"));
app.use(function(req, res, next) {
    res.status(404).redirect('/public/404/index.html');
  });