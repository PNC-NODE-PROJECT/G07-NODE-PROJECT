const container = document.getElementById("container");
const quizmb = document.getElementById("quizzes");
// console.log(quizmb)

// bar_down.style.display = "none"
// bar_up.style.display = "block"
// console.log(bar_up)
// console.log(bar_down)
let URL = 'http://localhost:' + 3000;

function getAllQuizzes() {

    axios.get(URL + '/quiz')
        .then((result) => {
            // console.log(result.data[0]._id);
            for (let item of result.data) {
                // console.log(item._id)
                let quizID = item._id;
                axios.get("http://localhost:3000/quiz/" + quizID)
                    .then((result) => {
                        let quizzes = result.data;
                        console.log(quizzes)
                        displayAllQuizzes(quizzes)
                    })
            }
        })
}

getAllQuizzes();
function displayAllQuizzes(quizzes) {
    
    // console.log(quizzes)
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

    let a4 = document.createElement("a");
    a4.href = "#"
    col_sm_2.appendChild(a4);

    let i4 = document.createElement("i");
    i4.setAttribute("class", "bi bi-pencil-square h3")
    a4.appendChild(i4);

    let a5 = document.createElement("a");
    a5.href = "#"
    col_sm_2.appendChild(a5);

    let i5 = document.createElement("i");
    i5.setAttribute("class", "bi bi-play-circle h3")
    a5.appendChild(i5);

    let questions = document.createElement("div");
    questions.setAttribute("class", "questions")

    quizmb.appendChild(questions);
    for (let index in quizzes) {
        let quiz = quizzes[index];
        let title = quiz.quizID.title;
        let question = quiz.title;
        let choices = quiz.choices;
        let corrects = quiz.correct;
        let quizID = quiz.quizID._id;


        quiz_name.textContent = title;
        a3.setAttribute("id", quizID)



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
    e.target.parentNode.style.display = "none";
    let bar_up = e.target.parentNode.parentNode.children[1];

    bar_up.style.display = "block"
    let div = e.target.parentNode.parentNode.parentNode.children[1];
    div.style.display = "block"


}
function hideQuestions(e) {
    e.target.parentNode.style.display = "none";
    let bar_down = e.target.parentNode.parentNode.children[0];

    bar_down.style.display = "block"
    let div = e.target.parentNode.parentNode.parentNode.children[1];
    div.style.display = "none";
}
let bar_up = document.getElementsByClassName("bar-up");
let bar_down = document.getElementsByClassName("bar-down");

function deletQuiz(e) {
    console.log(e.target.parentNode.id)
    let quizID = e.target.parentNode.id
    axios.delete("http://localhost:3000/quiz/" + quizID)
        .then((result) => {
            console.log("Delete success !")
            window.location.reload();
            // getAllQuizzes();
        })
}
