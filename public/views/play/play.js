if (!localStorage['userId']) {
    window.location.href = '../register/register.html';
}

// To prevent from refresh page during play quiz
if(window.performance.navigation.type == 1){
    window.location.href = '/';
}

// Get Quiz ID from localStorage
const QUIZ_ID_KEY = 'playQuizId';
const USER_CORRECT = 'usercorrect';
localStorage.removeItem(USER_CORRECT);

var quiz_id = localStorage.getItem(QUIZ_ID_KEY);
var userId = localStorage.getItem("userId");

// localStorage.setItem('playQuizId', quiz_id);
let number_of_questions = 0;
let total = document.getElementById("total");
let dom_correct = document.getElementById("correct");

let dom_incorrect = document.getElementById("incorrect");
let quiz_title = document.getElementsByClassName("quiz_title")[0];
let item_action_header = document.getElementById("item_action_header")
let userEmail = '';
let quizTitle = '';
let correct = [];
let allCorrectAnswers = [];
let result = document.getElementById("result");
let correctAnwser = 0;
let userAllCorrect = [];
let userCorrect = [];
let quizResult = 0;
let question_score = 0;
let quizScore = [];
let quiz = [];
let totalScore = 0;
let numberOfCorrect = 0;
let numberOfInorrect = 0;


const container = document.getElementById("container");
const quizmb = document.getElementById("quizzes");


function saveScore(data) {
    axios.post('/score/', data)
        .then((result) => {
            return result.data;
        })
}
function getQuestion() {
    axios.get('/quiz/' + quiz_id)
        .then((result) => {
            createDomPlay(result.data)
            return result.data;
        })
}


let indexToPlay = 0;
function createDomPlay(result) {
    while (mainQuizContaier.firstChild) {
        mainQuizContaier.removeChild(mainQuizContaier.lastChild);
    }
    quiz = result;
    number_of_questions = result.length
    let data = result[indexToPlay];
    quizTitle = data.quizID.title;
    question_score = data.score;
    quizTitle =  data.quizID.title;

    quiz_title.textContent = quizTitle;


    let headerQuiz = document.createElement('div');
    headerQuiz.classList = 'header_quiz';
    let title = document.createElement('div');
    title.classList = 'title_quiz h3';
    title.textContent = data.title;
    headerQuiz.appendChild(title);
    let progres_bar = document.createElement('div');
    progres_bar.classList = 'progress';
    headerQuiz.appendChild(progres_bar);
    let progress = document.createElement('progress');
    progress.classList = 'progress-bar';
    progres_bar.appendChild(progress);


    const QUESTION_NOW = indexToPlay + 1 + '/' + result.length;
    let numberOfQuestion = document.createElement('div');
    numberOfQuestion.classList = 'quiz_score';
    numberOfQuestion.textContent = QUESTION_NOW;
    headerQuiz.appendChild(numberOfQuestion);
    mainQuizContaier.appendChild(headerQuiz);

    let bodyQuiz = document.createElement('div');
    bodyQuiz.classList = 'body_quiz';
    let numberOfAnswer = data.choices.length;
    let numberOfHalfAn = numberOfAnswer / 2;
    const NUMBER_OF_LOOP = Math.round(numberOfHalfAn / 1) * 1;
    // Define correct answer number
    correctAnwser = data.correct.length;
    correct = result[indexToPlay].correct;
    let indexOfAn = 0;
    for (let i = 0; i < NUMBER_OF_LOOP; i++) {
        let answerCon = document.createElement('div');
        answerCon.classList = 'd-flex';
        bodyQuiz.appendChild(answerCon);
        for (let j = 0; j < 2; j++) {
            if (data.choices[indexOfAn] != undefined) {
                let answer = document.createElement('div');
                answer.classList = 'answer';
                answer.id = indexOfAn;
                answer.textContent = data.choices[indexOfAn];
                answerCon.appendChild(answer);
            }
            indexOfAn += 1;
        }
    }
    // update progress bar
    progress.value = indexToPlay + 1;
    progress.max = result.length;
    mainQuizContaier.appendChild(bodyQuiz);
}

let numberOfClick = 0;
let preindex = null;
let index = null;
function clickAnswer(e) {
    e.preventDefault();
    if (e.target.className === "answer") {
        index = e.target.id;
        if (index != preindex) {
            preindex = index
            numberOfClick += 1;
            e.target.style.backgroundColor = '#1E90FF';
            userCorrect.push(index);
        }
        if (numberOfClick == correctAnwser) {
            preindex = null;
            index = null;
            allCorrectAnswers.push(correct)
            userAllCorrect.push(userCorrect);
            userCorrect = [];
            quizScore.push(question_score)
            if (indexToPlay < number_of_questions - 1) {

                indexToPlay += 1;
                playQuiz();
                numberOfClick = 0;
            } else {
                result.style.display = "block";
                // TO STOP USER FROM REFRESH PAGE 
                item_action_header.style.display = "flex";
                // container.style.display = "block"
                document.getElementById("view_answer").style.display = "block";
                btnSendMail.style.display = "block";
                mainQuizContaier.style.display = "none";
                computeScore()
            }

        }
    }
    saveUserAnwerToLocalStorage(userAllCorrect)

}

// +++++++++++++++++++++ Compute Score +++++++++++++++++++
function computeScore() {
    for (let n in userAllCorrect) {
        let isRight = true
        for (let i in userAllCorrect[n]) {
            if (isRight) {
                if (!(allCorrectAnswers[n].includes(parseInt(userAllCorrect[n][i])))) {
                    isRight = false;
                }
            }
        }
        if (isRight) {
            quizResult += quizScore[n];
            numberOfCorrect += 1;
        } else {
            numberOfInorrect += 1;
        }

        totalScore += quizScore[n];
    }
    let TOTAL = quizResult + "/" + totalScore;
    let data = {score:TOTAL,quizTitle:quizTitle,userID:userId}
    saveScore(data)
    total.textContent = "Total Score: " + quizResult + "/" + totalScore;
    dom_correct.textContent = "correct: " + numberOfCorrect;
    dom_incorrect.textContent = "incorrect: " + numberOfInorrect;

}
function displayWrongeRightAnswers(quizzes) {
    let quizmb = document.createElement("div");
    quizmb.setAttribute("class", "quizzes mb-2")
    quizmb.setAttribute("id", "quizzes")
    container.appendChild(quizmb);

    let quiz_item = document.createElement("div");
    quiz_item.setAttribute("class", "quiz_item")
    quizmb.appendChild(quiz_item);

    let quiz_name = document.createElement("div");
    quiz_name.setAttribute("class", "quiz_name h5")
    quiz_name.textContent = "Present Simple";
    quiz_item.appendChild(quiz_name);

    let col_sm_2 = document.createElement("div");
    col_sm_2.setAttribute("class", "col-sm-2")
    quiz_item.appendChild(col_sm_2);

    // Set id of play icon to id of quiz 
    let questions = document.createElement("div");
    questions.setAttribute("class", "questions")

    quizmb.appendChild(questions);
    for (let index in quizzes) {
        let quiz = quizzes[index];

        let question = quiz.title;
        let choices = quiz.choices;
        let corrects = quiz.correct;

        let list_group = document.createElement("ul");
        list_group.setAttribute("class", "list-group w-100 mx-auto");
        questions.appendChild(list_group);

        let i = 0;
        while (i < choices.length + 1) {
            let list_group_item = document.createElement("li");
            if (i == 0) {
                list_group_item.setAttribute("class", "list-group-item  h5 active");
                list_group_item.textContent = question;

            } else {
                list_group_item.setAttribute("class", "list-group-item  h6");
                list_group_item.textContent = choices[i - 1]
                for (let correct of corrects) {
                    if (correct == i - 1) {
                        list_group_item.setAttribute("class", "list-group-item  h6 correct");
                    } else {
                        list_group_item.setAttribute("class", "list-group-item  h6 incorrect");
                    }
                }
            }
            list_group.appendChild(list_group_item);
            i++
        }
    }
}
function saveUserAnwerToLocalStorage(userCorrectAnswer) {
    localStorage.setItem(USER_CORRECT, JSON.stringify(userCorrectAnswer));
}
function playQuiz() {
    getQuestion()
}
playQuiz()

axios.get('/user/id/'+localStorage['userId'])
.then((result)=>{
    userEmail = result.data.email;
})

function sendScoreByEmail(){
    let data = {"email": userEmail, "score": quizResult, "totalScore": totalScore, "title": quizTitle}
    axios.post('/quiz/send/score/', data);
}




let mainQuizContaier = document.getElementById('play_quiz_container');
let btnSendMail = document.getElementById('send_mail');
btnSendMail.style.display = 'none';


btnSendMail.addEventListener('click', sendScoreByEmail);
mainQuizContaier.addEventListener('click', clickAnswer);





