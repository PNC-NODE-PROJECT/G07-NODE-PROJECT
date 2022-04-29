const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/quiz_app',{useUnifiedTopology:true});
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
const quizModel = mongoose.model("quizzes",quizSchema);
const questionModel = mongoose.model("questions",questionSchema);
const userModel = mongoose.model("users",userSchema);
module.exports = {quizModel,questionModel,userModel};