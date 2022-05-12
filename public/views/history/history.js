if (!localStorage['userId']) {
    window.location.href = '../register/register.html';
}

let userId = localStorage.getItem("userId")
let history = document.getElementById('history')
function getScore() {
    axios.get("/score/" + userId)
        .then((result) => {
            createDomScore(result.data)
            return result.data;
        })
}
getScore()


function createDomScore(data) {
    while (history.firstChild) {
        history.removeChild(history.lastChild);
    }
    for (let score of data) {
        console.log(score)
        let quiz_item = document.createElement('div');
        quiz_item.className = "quiz_item";
        history.appendChild(quiz_item);

        let logo = document.createElement("div")
        logo.className = "logo";
        quiz_item.appendChild(logo);

        let img = document.createElement("img")
        img.src = "../../image/logo.png";
        logo.appendChild(img);

        let quiz_name = document.createElement("div")
        quiz_name.className = "quiz_name h3";
        quiz_name.textContent = score.quizTitle;
        logo.appendChild(quiz_name);

        let scoreDiv = document.createElement("div")
        scoreDiv.className = "score";
        quiz_item.appendChild(scoreDiv);

        let quiz_score = document.createElement("div")
        quiz_score.className = "quiz_score h5";
        quiz_score.textContent = score.score;
        scoreDiv.appendChild(quiz_score);

        let trash = document.createElement("i")
        trash.className = "bi bi-trash-fill h3 text-danger";
        trash.id = score._id;
        trash.addEventListener("click", deleteScoreHistory)
        scoreDiv.appendChild(trash);
    }
}
function deleteScoreHistory(e) {
    // console.log(dd)
    let historyID = e.target.id;
    if (window.confirm("Are you sure to delete this history ?")) {

        axios.delete("/score/" + historyID)
            .then((result) => {
                console.log(result);

            })
        getScore()
    }

}