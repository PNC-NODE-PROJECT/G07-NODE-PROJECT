const PORT = process.env.PORT || 3000
const URL = 'http://localhost:' + PORT;


// create list answer
function createAnswerList(){
    // tempAnswerCon.classList = 'answer_temp row mb-3';
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
    checkBoxCon.appendChild(checkBox);

    answer.value = '';
}

// Create list of question created 
function questionCone(){
    let list = document.createElement('div');
    list.classList = 'list create_question_con input_form mb-3'
    questionCon.appendChild(list);

    let headerList = document.createElement('div');
    headerList.classList = 'header_list row';
    list.appendChild(headerList);

    let question = document.createElement('div');
    question.classList = 'title_question col-sm-10';
    question.textContent = 'What is present Simple?';
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

    // Answer display
    let body_list = document.createElement('div');
    list.appendChild(body_list);
    body_list.classList = 'body_list';
    for(let i=0; i<4;i++){
        let answer = document.createElement('div');
        answer.classList = 'answer_con';
        answer.textContent = 'I am going to school';
        body_list.appendChild(answer);
    }
}




let tempAnswerCon = document.querySelector('.answer_temp');
let addMoreAnBtn = document.querySelector('.add_answer_more');
let questionCon = document.querySelector('.list_of_questions');
let answer = document.querySelector('.answer_input');
let btnSaveQuestion = document.getElementById('save_question');

addMoreAnBtn.addEventListener('click', createAnswerList);
btnSaveQuestion.addEventListener('click', questionCone);