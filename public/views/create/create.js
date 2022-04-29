const URL = 'http://localhost:' + 3000;

// Edit Button
let btnUpdate = document.querySelector('#update_question');

// Hide Btn
hide(btnUpdate);

// Hide & Show element
function hide(e){
    e.style.display = 'none';
}
function show(e){
    e.style.display = '';
}

// Change action
function saveActionBtn(){
    hide(btnUpdate);
    show(btnSaveQuestion);
}
function updateActionBtn(){
    hide(btnSaveQuestion);
    show(btnUpdate);
}

// create list answer
function createAnswerList(){
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
    inputAnsCon.appendChild(inputAns);

    let checkBoxCon = document.createElement('div');
    checkBoxCon.classList = 'col-sm-2';
    tempAnswerCon.appendChild(checkBoxCon);

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList = 'select_answer_btn';
    if(answerCheck.checked){
        checkBox.checked = true;
    }
    checkBoxCon.appendChild(checkBox);

    answer.value = '';
    answerCheck.checked = false;
}


// Create list of question created 
function questionContainer(temp_answers){
    resfreshListQuestion();
    let indexOfAn = 0;
    for(let data of temp_answers){
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
        // edit.setAttribute('data-bs-toggle', 'modal');
        // edit.setAttribute('data-bs-target', '#editModal');
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
        for(let i=0; i<data.choices.length;i++){
            let answer = document.createElement('div');
            answer.classList = 'answer_con';
            for(let j=0; j<data.correct.length;j++){
                if(i==data.correct[j]){
                    answer.classList = 'checked answer_con';
                }
            }
            answer.textContent = data.choices[i];
            body_list.appendChild(answer);
        }
        indexOfAn+=1;
    }
}

let temp_quiz = {};
let temp_answers = [];


function addQuiz(){
    // add quiz title to database
    axios.post(URL+'/quiz/create', temp_quiz)
    .then((result)=>{
        console.log(result);
    })
    // add quetion to database
    axios.post(URL+'/quiz/question', temp_answers)
    .then((result)=>{
        console.log(result);
    })
    temp_quiz = {};
    temp_answers = [];
}

// Get all value of question form 
function getQuestionValue(){
    let temp_arr = {};
    // get value from question form;
    let answers = [];
    for(let i=0; i<answerInputs.length;i++){
        if(answerInputs[i].value.length != 0){
            answers.push(answerInputs[i].value);
        }
    }
    let correct = [];
    for(let i=0; i<correctionInput.length;i++){
        if(correctionInput[i].checked){
            correct.push(i);
        }
    }
    temp_arr['title'] = questionInput.value;
    temp_arr['choices'] = answers;
    temp_arr['correct'] = correct;
    temp_arr['score'] = scoreInput.value;
    temp_arr['quizID'] = '6269e951c383bd7392adb56e';
    console.log(temp_arr);
    return temp_arr;
}

function addQustionTemp(){
    // get title of quiz 
    temp_quiz['title'] = titleInput.value;
    temp_quiz['authorID'] = '6269df2fc383bd7392adb517';

    // get value from question form and push to temp_answers 
    temp_answers.push(getQuestionValue());
    console.log(getQuestionValue());
    questionContainer(temp_answers);
    resetForm();
}

function resetForm(){
    saveActionBtn();
    titleOfAction.textContent = 'Create Your Question';
    questionInput.value = '';
    scoreInput.value = 0;
    for(let i=0; i<answerInputs.length;i++){
        answerInputs[i].value = '';
    }
    let correct = [];
    for(let i=0; i<correctionInput.length;i++){
        if(correctionInput[i].checked){
            correctionInput[i].checked = false;
        }
    }
    resfreshAnswerInput();
}
// Refresh Answer Input Dom
function resfreshAnswerInput(){
    while(tempAnswerCon.firstChild){
        tempAnswerCon.removeChild(tempAnswerCon.lastChild);
    }
}
// Refresh Question List
function resfreshListQuestion(){
    while(questionCon.firstChild){
        questionCon.removeChild(questionCon.lastChild);
    }
}
// GET VALUE FROM ANSWER AND LIST IT DOWN BY INPUT AND CHECKBOX
function listInputAnswer(answers, correction){
    resfreshAnswerInput();
    for(let i=0;i<answers.length;i++){
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
        inputAns.value = answers[i];
        inputAnsCon.appendChild(inputAns);
    
        let checkBoxCon = document.createElement('div');
        checkBoxCon.classList = 'col-sm-2';
        tempAnswerCon.appendChild(checkBoxCon);
    
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList = 'select_answer_btn';
        for(let correct of correction){
            if(i == correct){
                checkBox.checked = true;
            }

        }
        checkBoxCon.appendChild(checkBox);
    }
}
// GET VALUE FROM QUESTION FORM FOR UPDATE
function getValueFromQuestion(temp_answers){
    let data = temp_answers;
    scoreInput.value = data.score;
    questionInput.value = data.title;
    listInputAnswer(data.choices, data.correct);
}

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
        temp_answers.splice(id, 1);
        questionContainer(temp_answers);
    }
  } else if (e.target.className === "edit_question" || e.target.className === "bi bi-pencil-square") {
        let id = e.target.parentElement.parentElement.id;
        if(e.target.className === 'bi bi-pencil-square'){
            id = e.target.parentElement.parentElement.parentElement.id;
        }
        updateActionBtn();
        titleOfAction.textContent = 'Update Your Question';
        getValueFromQuestion(temp_answers[id]);
        indexToUpdate = id;
  }
}

function updateQuestion(){
    let updated = temp_answers[indexToUpdate] = getQuestionValue();
    if(updated){
        alert('Question Updated!')
        resetForm();
        questionContainer(temp_answers);
    }
}

function resetQuiz(){
    resetForm();
    temp_answers = [];
    temp_quiz = {};
    questionContainer(temp_answers);
}

let tempAnswerCon = document.querySelector('.answer_temp');
let addMoreAnBtn = document.querySelector('.add_answer_more');
let questionCon = document.querySelector('.list_of_questions');
let answer = document.querySelector('.answer_input');
let answerCheck = document.querySelector('.select_answer_btn');
let btnSaveQuestion = document.getElementById('save_question');
let btnSaveQuiz = document.getElementById('submit_quiz');
let btnCancelQuestion = document.getElementById('calcel_question');
let btnCalcelQuiz = document.getElementById('cancel_quiz');

// Title of Quiz 
let titleInput = document.getElementById('inputTitle');
let titleOfAction = document.getElementById('titleOfForm');

// Question form input
let scoreInput = document.getElementById('inputScore');
let questionInput = document.getElementById('inputQuestion');
let answerInputs = document.getElementsByClassName('answer_input');
let correctionInput = document.getElementsByClassName('select_answer_btn');



addMoreAnBtn.addEventListener('click', createAnswerList);
btnSaveQuestion.addEventListener('click', addQustionTemp);
btnSaveQuiz.addEventListener('click', addQuiz);
questionCon.addEventListener('click', clickQuestion);
btnUpdate.addEventListener('click', updateQuestion)
btnCancelQuestion.addEventListener('click', resetForm)
btnCalcelQuiz.addEventListener('click', resetQuiz)