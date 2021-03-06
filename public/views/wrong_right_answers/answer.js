if (!localStorage['userId']) {
    window.location.href = '../register/register.html';
}
// Get Quiz ID from localStorage
const QUIZ_ID_KEY = 'playQuizId';
const USER_CORRECT = 'usercorrect';
var quiz_id = localStorage.getItem(QUIZ_ID_KEY);
var userAllCorrectAnswer = JSON.parse(localStorage.getItem(USER_CORRECT));

let dom_correct = document.getElementById("correct");

let dom_incorrect = document.getElementById("incorrect");


function getQuestion() {
    axios.get('/quiz/' + quiz_id)
        .then((result) => {
            displayWrongeRightAnswers(result.data)
            return result.data;
        })
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
        quiz_name.textContent = quiz.quizID.title;

        let question = quiz.title;
        let choices = quiz.choices;
        let corrects = quiz.correct;

        let list_group = document.createElement("ul");
        list_group.setAttribute("class", "list-group w-100 mx-auto"); 
        questions.appendChild(list_group);
        let list_group_item = document.createElement("li");
        list_group_item.setAttribute("class", "list-group-item  h5 active");
        list_group_item.textContent = question;
        list_group.appendChild(list_group_item);

        let i = 0;
        while (i < choices.length) {
            let list_group_item = document.createElement("li");

            list_group_item.setAttribute("class", "list-group-item  h6");
            list_group_item.textContent = choices[i]
            for (let correct of corrects) {
                if (correct == i) {
                    list_group_item.setAttribute("class", "list-group-item  h6 correct");
                } else {
                    for (let j in userAllCorrectAnswer[index]) {
                        if (!(corrects.includes(parseInt(userAllCorrectAnswer[index][j]))) && userAllCorrectAnswer[index][j] == i) {
                            list_group_item.setAttribute("class", "list-group-item  h6 incorrect");

                        }

                    }

                }
            }
            list_group.appendChild(list_group_item);
            i++
        }

    }

}
getQuestion() 