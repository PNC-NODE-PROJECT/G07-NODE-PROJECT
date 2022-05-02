const URL = 'http://localhost:' + 3000;
// Get Quiz ID from localStorage
const QUIZ_ID_KEY = 'playQuizId';
const USER_CORRECT = 'usercorrect';
localStorage.removeItem(USER_CORRECT);




var quiz_id = localStorage.getItem(QUIZ_ID_KEY);
let number_of_questions = 0;
let total = document.getElementById("total");
let dom_correct = document.getElementById("correct");

let dom_incorrect = document.getElementById("incorrect");


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
function getQuestion() {
    axios.get(URL + '/quiz/' + quiz_id)
        .then((result) => {
            createDomPlay(result.data)
            return result.data;
        })
        // .then((result) => {
        //     displayWrongeRightAnswers(quiz)
        //     return result.data;
        // })
}


let indexToPlay = 0;
function createDomPlay(result) {
    while (mainQuizContaier.firstChild) {
        mainQuizContaier.removeChild(mainQuizContaier.lastChild);
    }
    quiz = result;
    number_of_questions = result.length
    let data = result[indexToPlay];
    question_score = data.score;



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
    // console.log(NUMBER_OF_LOOP);
    // Define correct answer number
    correctAnwser = data.correct.length;
    // console.log(NUMBER_OF_LOOP);

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
let index = null;
function clickAnswer(e) {
    e.preventDefault();
    if (e.target.className === "answer") {
        index = e.target.id;
        numberOfClick += 1;
        e.target.style.backgroundColor = '#1E90FF';
        //   console.log(correctAnwser);
        userCorrect.push(index);
        if (numberOfClick == correctAnwser) {
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
                // container.style.display = "block"
                document.getElementById("view_answer").style.display = "block";
                mainQuizContaier.style.display = "none";
                computeScore()

            }

        }
    }
    console.log(userAllCorrect)
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
    total.textContent = "Total Score: " + quizResult + "/" + totalScore;
    dom_correct.textContent = "correct: " + numberOfCorrect;
    dom_incorrect.textContent = "incorrect: " + numberOfInorrect;

}
function displayWrongeRightAnswers(quizzes) {

    // console.log(quizzes)
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
                    }else{
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

    console.log(userCorrectAnswer)
    localStorage.setItem(USER_CORRECT, JSON.stringify(userCorrectAnswer));
}
function playQuiz() {
    getQuestion()
}
playQuiz()



let mainQuizContaier = document.getElementById('play_quiz_container');
mainQuizContaier.addEventListener('click', clickAnswer);




