if (!localStorage['userId']) {
    window.location.href = '../register/register.html';
}
// Remove id of Quiz from LocalStorage
const QUIZ_ID_KEY = 'playQuizId';
localStorage.removeItem(QUIZ_ID_KEY);

const container = document.getElementById("container");
const quizmb = document.getElementById("quizzes");

let URL = 'http://localhost:' + 3000;

function getAllQuizzes() {

    axios.get(URL + '/quiz')
        .then((result) => {
            for (let item of result.data) {
                let quizID = item._id;
                let title = item.title;
                axios.get("http://localhost:3000/quiz/" + quizID)
                    .then((result) => {
                        let quizzes = result.data;

                        if (quizzes.length > 0) {
                            displayAllQuizzes(quizzes, title, quizID)
                        } else {
                            console.log("quizzes")
                            axios.delete("http://localhost:3000/quiz/" + quizID)
                                .then((result) => {
                                    console.log("delete successful")
                                })
                        }
                    })
            }
        })
}
function displayAllQuizzes(quizzes, title, quizID) {

    let quizmb = document.createElement("div");
    quizmb.setAttribute("class", "quizzes mb-2")
    quizmb.setAttribute("id", "quizzes")
    container.appendChild(quizmb);

    let quiz_item = document.createElement("div");
    quiz_item.setAttribute("class", "quiz_item")
    quizmb.appendChild(quiz_item);

    let a1 = document.createElement("a");
    a1.href = "#"
    a1.setAttribute("class", "text-dark  bar-down")
    a1.setAttribute("id", "bar-down")
    a1.addEventListener("click", showQuestions)
    quiz_item.appendChild(a1);

    let i1 = document.createElement("i");
    i1.setAttribute("class", "bi bi-chevron-bar-down h3")
    i1.setAttribute("id", "bar-down")
    a1.appendChild(i1);

    let a2 = document.createElement("a");
    a2.href = "#"
    a2.setAttribute("class", "text-dark  bar-up")
    a2.setAttribute("id", "bar-up")
    a2.addEventListener("click", hideQuestions)

    quiz_item.appendChild(a2);

    let i2 = document.createElement("i");
    i2.setAttribute("class", "bi bi-chevron-bar-up h3")
    i2.setAttribute("id", "bar-up")
    a2.appendChild(i2);

    let quiz_name = document.createElement("div");
    quiz_name.setAttribute("class", "quiz_name h5")
    quiz_name.textContent = title;
    quiz_item.appendChild(quiz_name);

    let col_sm_2 = document.createElement("div");
    col_sm_2.setAttribute("class", "col-sm-2")
    quiz_item.appendChild(col_sm_2);


    let a3 = document.createElement("a");
    a3.href = "#"
    col_sm_2.appendChild(a3);

    let i3 = document.createElement("i");
    i3.setAttribute("class", "bi bi-trash-fill h3 text-danger")
    a3.appendChild(i3);
    a3.addEventListener("click", deletQuiz)
    // Set id of delete icon to id of quiz 
    a3.setAttribute("id", quizID)
    let a4 = document.createElement("a");
    a4.href = "#"
    col_sm_2.appendChild(a4);

    let i4 = document.createElement("i");
    i4.setAttribute("class", "bi bi-pencil-square h3")
    a4.href = "../update/edit.html";
    a4.appendChild(i4);
    a4.addEventListener('click', saveIdToLocalStorage)

    let a5 = document.createElement("a");
    a5.href = "../play/play.html";
    col_sm_2.appendChild(a5);
    a5.addEventListener('click', saveIdToLocalStorage)

    let i5 = document.createElement("i");
    i5.setAttribute("class", "bi bi-play-circle h3")
    a5.appendChild(i5);
    // Set id of play icon to id of quiz 
    a5.id = quizID;
    let questions = document.createElement("div");
    questions.setAttribute("class", "questions")

    quizmb.appendChild(questions);
    for (let index in quizzes) {
        let quiz = quizzes[index];

        let question = "(" + quiz.score + "pt) " + quiz.title;
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
                    }
                }
            }
            list_group.appendChild(list_group_item);
            i++
        }

    }

}
// displayAllQuizzes();
function showQuestions(e) {
    e.preventDefault();
    e.target.parentNode.style.display = "none";
    let bar_up = e.target.parentNode.parentNode.children[1];

    bar_up.style.display = "block"
    let div = e.target.parentNode.parentNode.parentNode.children[1];
    console.log(div)
    div.style.display = "block"
}
function hideQuestions(e) {
    e.preventDefault();
    e.target.parentNode.style.display = "none";
    let bar_down = e.target.parentNode.parentNode.children[0];
    bar_down.style.display = "block"
    let div = e.target.parentNode.parentNode.parentNode.children[1];
    div.style.display = "none";
}

function saveIdToLocalStorage(e) {
    console.log(e.target.parentNode.id);
    let idOfQuiz = e.target.parentNode.id
    // if target === edit icon
    if (e.target.className === 'bi bi-pencil-square h3') {
        idOfQuiz = e.target.parentNode.nextSibling.id
    }
    localStorage.setItem(QUIZ_ID_KEY, idOfQuiz);
}

let bar_up = document.getElementsByClassName("bar-up");
let bar_down = document.getElementsByClassName("bar-down");
function deletQuiz(e) {
    e.preventDefault();
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    console.log(e.target.parentNode.id)
    let quizID = e.target.parentNode.id
    console.log(quizID)
    if (confirm("Are you sure to delete this quiz? ")) {
        axios.delete("http://localhost:3000/quiz/" + quizID)
            .then((result) => {
                console.log("Delete success !")
                getAllQuizzes();
            })
    } else {
        getAllQuizzes();
    }
}
getAllQuizzes();
