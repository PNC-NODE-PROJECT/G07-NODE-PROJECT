const URL = 'http://localhost:' + 3000;


// Get data from 
function displayQuestionValue(){
    axios.get(URL+'/quiz/question/626b63109d2054c6b25e1b3c')
    .then((result)=>{
        getValueFromQuestion(result);
    })
}

// Put data to database
function updateQuestion(){
    let data = getQuestionValue();
    axios.put(URL+'/quiz/question/626b63109d2054c6b25e1b3c', data)
    .then((result)=>{
        console.log(result.data);
        alert('update!')
    })
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
    temp_arr['quizID'] = '6269df2fc383bd7392adb517';
    console.log(temp_arr);
    return temp_arr;
}

function resetForm(){
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

// GET VALUE FROM ANSWER AND LIST IT DOWN BY INPUT AND CHECKBOX
function listInputAnswer(answers, correction){
    // resfreshAnswerInput();
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
function getValueFromQuestion(result){
    let data = result.data;
    scoreInput.value = data.score;
    questionInput.value = data.title;
    listInputAnswer(data.choices, data.correct);
}

let tempAnswerCon = document.querySelector('.answer_temp');
let addMoreAnBtn = document.querySelector('.add_answer_more');
let answer = document.querySelector('.answer_input');
let answerCheck = document.querySelector('.select_answer_btn');
let btnUpdateQuestion = document.getElementById('update_question');
let btnCancelQuestion = document.getElementById('calcel_question');


// Question form input
let scoreInput = document.getElementById('inputScore');
let questionInput = document.getElementById('inputQuestion');
let answerInputs = document.getElementsByClassName('answer_input');
let correctionInput = document.getElementsByClassName('select_answer_btn');



addMoreAnBtn.addEventListener('click', createAnswerList);
btnUpdateQuestion.addEventListener('click', updateQuestion);
// btnCancelQuestion.addEventListener('click', resetForm)


displayQuestionValue();
