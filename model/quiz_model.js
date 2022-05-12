require("dotenv").config();
const DATA_BASES = process.env.DATA_BASES;
const mongoose = require("mongoose");
mongoose.connect(DATA_BASES, {useUnifiedTopology:true});
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("Connected successfully");
});
const quizSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

})

const questionSchema = new mongoose.Schema({
    title: String,
    choices:[String],
    correct:[Number],
    score: Number,
    "quizID":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizzes"
    }
})

const quizCode = new mongoose.Schema({
    code: String,
    "quizID":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizzes"
    }
})

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required : true,
    },
    last_name:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
})
const scoreSchema = new mongoose.Schema({
    score:{
        type: String,
        required : true,
    },
    quizTitle:{
        type: String,
        required : true,
    },
    "userID":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    
})
const quizModel = mongoose.model("quizzes",quizSchema);
const quizCodeModel = mongoose.model("quizcodes",quizCode);
const questionModel = mongoose.model("questions",questionSchema);
const userModel = mongoose.model("users",userSchema);
const scoreModel = mongoose.model("scores",scoreSchema);
module.exports = {quizModel,questionModel,userModel,scoreModel,quizCodeModel};
