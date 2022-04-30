// const { get } = require("express/lib/request");

const URL = 'http://localhost:' + 3000;
// Get Quiz ID from localStorage
const QUIZ_ID_KEY = 'playQuizId';
var quiz_id = localStorage.getItem(QUIZ_ID_KEY);

// Edit Button
let btnUpdate = document.querySelector('#update_question');

// Hide Btn
hide(btnUpdate);

// Hide & Show element
function hide(e) {
    e.style.display = 'none';
}
function show(e) {
    e.style.display = '';
}

// Change action 
function saveActionBtn() {
    hide(btnUpdate);
    show(btnSaveQuestion);
}
function updateActionBtn() {
    hide(btnSaveQuestion);
    show(btnUpdate);
}

// create list answer
function createAnswerList(e) {
    let alert = e.target.parentNode.parentNode.parentNode.parentNode.children[2];
    let warining_text = alert.children[0];
    console.log(warining_text)
    if (answer.value != "") {


        let label = document.createElement('label');
        label.classList = 'col-sm-2 col-form-label';
        label.textContent = 'Answer';
        tempAnswerCon.appendChild(label);

        let inputAnsCon = document.createElement('div');
        inputAnsCon.classList = 'col-sm-8 mb-3';
        tempAnswerCon.appendChild(inputAnsCon);

        let inputAns = document.createElement('input');
        inputAns.type = 'text';
        inputAns.classList = 'form-control shadow-none answer_input';
        inputAns.placeholder = 'e.g I go to school';
        inputAns.value = answer.value;
        console.log(answer.value)
        inputAnsCon.appendChild(inputAns);

        let checkBoxCon = document.createElement('div');
        checkBoxCon.classList = 'col-sm-2';
        tempAnswerCon.appendChild(checkBoxCon);

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList = 'select_answer_btn';
        if (answerCheck.checked) {
            checkBox.checked = true;
        }
        checkBoxCon.appendChild(checkBox);

        answer.value = '';
        answerCheck.checked = false;
    } else {
        alert.style.display = "flex"
        warining_text.textContent = "Please input the answer !"
    }
}


// Create list of question created 
function questionContainer(temp_answers) {
    resfreshListQuestion();
    let indexOfAn = 0;
    for (let data of temp_answers) {
        let list = document.createElement('div');
        list.classList = 'list create_question_con input_form mb-3'
        questionCon.appendChild(list);

        let headerList = document.createElement('div');
        headerList.classList = 'header_list row';
        headerList.id = indexOfAn;
        list.appendChild(headerList);

        let question = document.createElement('div');
        question.classList = 'title_question col-sm-10';
        question.textContent = data.title;
        headerList.appendChild(question);

        let btnGroup = document.createElement('div');
        btnGroup.classList = 'col-sm-2';
        headerList.appendChild(btnGroup);
        // Edit action
        let edit = document.createElement('button');
        edit.classList = 'edit_question';
        let editIcon = document.createElement('i');
        editIcon.classList = 'bi bi-pencil-square';
        edit.appendChild(editIcon);
        btnGroup.appendChild(edit);
        // Edit action
        let deleteBtn = document.createElement('button');
        deleteBtn.classList = 'delete_question';
        let deleteIcon = document.createElement('i');
        deleteIcon.classList = 'bi bi-trash-fill';
        deleteBtn.appendChild(deleteIcon);
        btnGroup.appendChild(deleteBtn);
        // Score display
        let score = document.createElement('div');
        score.classList = 'show_score col-sm-2';
        score.textContent = data.score;
        btnGroup.appendChild(score);

        // Answer display
        let body_list = document.createElement('div');
        list.appendChild(body_list);
        body_list.classList = 'body_list';
        for (let i = 0; i < data.choices.length; i++) {
            let answer = document.createElement('div');
            answer.classList = 'answer_con';
            for (let j = 0; j < data.correct.length; j++) {
                if (i == data.correct[j]) {
                    answer.classList = 'checked answer_con';
                }
            }
            answer.textContent = data.choices[i];
            body_list.appendChild(answer);
        }
        indexOfAn += 1;
    }
}


// GET ALL QUIZ FROM DATABASE
function getQuizValue() {
    axios.get(URL + '/quiz/' + quiz_id)
        .then((result) => {
            console.log(result);
            temp_answers = result.data;
            questionContainer(temp_answers);
            titleInput.value = result.data[0].quizID.title;
            console.log(temp_answers);
        })
}


function addQuestion() {
    // Update Quiz
    let data = { "title": titleInput.value }
    axios.put(URL + '/quiz/' + quiz_id, data)
        .then((result) => {
            console.log(result);
        })
    // add quetion to database
    axios.post(URL + '/quiz/question', temp_answers)
        .then((result) => {
            console.log(result);
        })
    window.location.href = "../view_all_quizzes/view_all_quizzes.html";
}

// Add quiz title to db
function addQuiz(e) {
    // add quiz title to database
    let data = { 'title': titleInput.value, 'authorID': '6269df2fc383bd7392adb517' }
    let alert = e.target.parentNode.parentNode.children[0].children[2]
    let warining_text = alert.children[0];
    if (titleInput.value != "") {
        alert.style.display = "none";
        axios.post(URL + '/quiz/create', data)
            .then((result) => {
                quiz_id = result.data._id;
                show(questionForm);
                show(btnSubmit);
                hide(btnSave);
            })
    } else {
        alert.style.display = "flex";
        warining_text.textContent = "Please input the title of the quiz"
    }

}

// Get all value of question form 
function getQuestionValue() {
    let temp_arr = {};
    // get value from question form;
    let answers = [];
    for (let i = 0; i < answerInputs.length; i++) {
        if (answerInputs[i].value.length != 0) {
            answers.push(answerInputs[i].value);
        }
    }
    let correct = [];
    for (let i = 0; i < correctionInput.length; i++) {
        if (correctionInput[i].checked) {
            correct.push(i);
        }
    }
    temp_arr['title'] = questionInput.value;
    temp_arr['choices'] = answers;
    temp_arr['correct'] = correct;
    temp_arr['score'] = scoreInput.value;
    temp_arr['quizID'] = quiz_id;
    if(localStorage['playQuizId'].length!==0){
        temp_arr['_id'] = id_question.value;
    }
    console.log(temp_arr);
    return temp_arr;
}

function addQustionTemp(e) {
    // get value from question form and push to temp_answers 
    let alert = e.target.parentNode.parentNode.parentNode.children[2];
    let warining_text = alert.children[0];
    console.log(getQuestionValue())
    let score = getQuestionValue().score;
    let questionTitle = getQuestionValue().title;
    let choices = getQuestionValue().choices;
    let correct = getQuestionValue().correct;

    if ((questionTitle == "" && score == "") && (choices.length == 0 && correct.length == 0)) {
        console.log()
        alert.style.display = "flex"
        warining_text.textContent = "Please input question, answer, score and add correct answer !"
    } else if (score == "") {
        alert.style.display = "flex"
        warining_text.textContent = "Please input the score of the question !"
    } else if (questionTitle == "") {
        alert.style.display = "flex"
        warining_text.textContent = "Please input the title of the question !"
    } else if (choices.length == 0) {
        alert.style.display = "flex"
        warining_text.textContent = "Please input the answer of the question !"
    } else if (correct.length == 0) {
        alert.style.display = "flex"
        warining_text.textContent = "Please choose the correct of the question !"
    } else {
        alert.style.display = "none"
        temp_answers.push(getQuestionValue());

        questionContainer(temp_answers);
        resetForm();
    }
}

function resetForm() {
    // saveActionBtn();
    titleOfAction.textContent = 'Create Your Question';
    questionInput.value = '';
    scoreInput.value = 0;
    for (let i = 0; i < answerInputs.length; i++) {
        answerInputs[i].value = '';
    }
    let correct = [];
    for (let i = 0; i < correctionInput.length; i++) {
        if (correctionInput[i].checked) {
            correctionInput[i].checked = false;
        }
    }
    saveActionBtn();
    resfreshAnswerInput();
}
// Refresh Answer Input Dom
function resfreshAnswerInput() {
    while (tempAnswerCon.firstChild) {
        tempAnswerCon.removeChild(tempAnswerCon.lastChild);
    }
}
// Refresh Question List
function resfreshListQuestion() {
    while (questionCon.firstChild) {
        questionCon.removeChild(questionCon.lastChild);
    }
}
// GET VALUE FROM ANSWER AND LIST IT DOWN BY INPUT AND CHECKBOX
function listInputAnswer(data){
    resfreshAnswerInput();
    console.log(data);
    for(let i=0;i<data.choices.length;i++){
        let label = document.createElement('label');
        label.classList = 'col-sm-2 col-form-label';
        label.textContent = 'Answer';
        tempAnswerCon.appendChild(label);
        // id_question.value = '';
        if(localStorage['playQuizId'].length!==0){
            id_question.value = data._id;
        }

        let inputAnsCon = document.createElement('div');
        inputAnsCon.classList = 'col-sm-8 mb-3';
        tempAnswerCon.appendChild(inputAnsCon);

        let inputAns = document.createElement('input');
        inputAns.type = 'text';
        inputAns.classList = 'form-control shadow-none answer_input';
        inputAns.placeholder = 'e.g I go to school';
        inputAns.value = data.choices[i];
        inputAnsCon.appendChild(inputAns);

        let checkBoxCon = document.createElement('div');
        checkBoxCon.classList = 'col-sm-2';
        tempAnswerCon.appendChild(checkBoxCon);

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList = 'select_answer_btn';
        for(let item of data.correct){
            if(i == item){
                checkBox.checked = true;
            }

        }
        checkBoxCon.appendChild(checkBox);
    }
}
// GET VALUE FROM QUESTION FORM FOR UPDATE
function getValueFromQuestion(temp_answers) {
    let data = temp_answers;
    scoreInput.value = data.score;
    questionInput.value = data.title;
    listInputAnswer(data);
}

let listIdToDelete = [];
let indexToUpdate = 0;
function clickQuestion(e) {
  e.preventDefault();
  if (e.target.className === "delete_question" || e.target.className === 'bi bi-trash-fill') {
    let id = e.target.parentElement.parentElement.id;
    if(e.target.className === 'bi bi-trash-fill'){
        id = e.target.parentElement.parentElement.parentElement.id;
    }
    let isExecuted = confirm("Are you sure to delete this task?");
    if (isExecuted) {
        listIdToDelete.push(temp_answers[id]._id);
        temp_answers.splice(id, 1);
        questionContainer(temp_answers);
    }
  } else if (e.target.className === "edit_question" || e.target.className === "bi bi-pencil-square") {
        let id = e.target.parentElement.parentElement.id;
        if (e.target.className === 'bi bi-trash-fill') {
            id = e.target.parentElement.parentElement.parentElement.id;
        }
        let isExecuted = confirm("Are you sure to delete this task?");
        if (isExecuted) {
            temp_answers.splice(id, 1);
            questionContainer(temp_answers);
        }
    } else if (e.target.className === "edit_question" || e.target.className === "bi bi-pencil-square") {
        let id = e.target.parentElement.parentElement.id;
        if (e.target.className === 'bi bi-pencil-square') {
            id = e.target.parentElement.parentElement.parentElement.id;
        }
        window.location.href = "#action_form_input";
        updateActionBtn();
        titleOfAction.textContent = 'Update Your Question';
        getValueFromQuestion(temp_answers[id]);
        indexToUpdate = id;
    }
}

// Update Question in temporay object 
function updateQuestion(){
    let updated = temp_answers[indexToUpdate] = getQuestionValue();
    if(updated){
        console.log('Update!');
        resetForm();
        questionContainer(temp_answers);
    }
}
// Update Quiz to DB
function updateQuiz(){
    // Update Quiz title
    let data = {"title":titleInput.value}
    axios.put(URL+'/quiz/'+quiz_id, data)
    .then((result)=>{
        console.log(result);
    })
    // delete quetion in database
    for(let id of listIdToDelete){
        axios.delete(URL+'/quiz/question/'+id)
        .then((result)=>{
            console.log(result);
        })
    }
    // edit quetion to database
    for(let item of temp_answers){
        console.log(item._id);
        console.log(item);
        let questionId = item._id;
        
        axios.put(URL+'/quiz/question/'+questionId, item)
        .then((result)=>{
            console.log(result);
        })
    }
    window.location.href = "../view_all_quizzes/view_all_quizzes.html";
}

function resetQuiz() {
    temp_answers = [];
    window.location.href = "/";
}

function closeWarning(e) {
    e.target.parentNode.style.display = "none";
    console.log(e.target.parentNode)
}

let tempAnswerCon = document.querySelector('.answer_temp');
let addMoreAnBtn = document.querySelector('.add_answer_more');
let questionCon = document.querySelector('.list_of_questions');
let answer = document.querySelector('.answer_input');
let answerCheck = document.querySelector('.select_answer_btn');
let btnSaveQuestion = document.getElementById('save_question');
let btnSubmit = document.getElementById('submit_quiz');
let btnUpdateQuiz = document.getElementById('update_quiz');
let btnSave = document.getElementById('save_quiz');
let btnCancelQuestion = document.getElementById('calcel_question');
let btnCalcelQuiz = document.getElementById('cancel_quiz');

// Title of Quiz 
let titleInput = document.getElementById('inputTitle');
let titleOfAction = document.getElementById('titleOfForm');

// Question form input
let questionForm = document.getElementById('action_form_input');
let id_question = document.getElementById('input_id');
let scoreInput = document.getElementById('inputScore');
let questionInput = document.getElementById('inputQuestion');
let answerInputs = document.getElementsByClassName('answer_input');
let correctionInput = document.getElementsByClassName('select_answer_btn');



addMoreAnBtn.addEventListener('click', createAnswerList);
btnSaveQuestion.addEventListener('click', addQustionTemp);
btnSave.addEventListener('click', addQuiz);
btnSubmit.addEventListener('click', addQuestion);
questionCon.addEventListener('click', clickQuestion);
btnUpdate.addEventListener('click', updateQuestion)
btnCancelQuestion.addEventListener('click', resetForm)
btnCalcelQuiz.addEventListener('click', resetQuiz)
let closewarning = document.getElementsByClassName("close")
// .addEventListener("click", closeWarning)
for (let close of closewarning) {
    close.addEventListener("click", closeWarning)
}
// let quiz_id = '';
let temp_answers = [];



if(quiz_id=='' || quiz_id == null){
    hide(questionForm);
    hide(btnSubmit);
    show(btnSave)
}else{
    hide(btnSave);
    hide(btnSubmit);
    getQuizValue()
    btnUpdateQuiz.addEventListener('click', updateQuiz)
}



