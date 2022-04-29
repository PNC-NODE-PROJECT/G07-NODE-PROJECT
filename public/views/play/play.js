const URL = 'http://localhost:' + 3000;
// Get Quiz ID from localStorage
const QUIZ_ID_KEY = 'playQuizId';
var quiz_id = localStorage.getItem(QUIZ_ID_KEY);

let correctAnwser = 0;

function getQuestion(){
    axios.get(URL+'/quiz/'+quiz_id)
    .then((result)=>{
        console.log(result);
        createDomPlay(result.data)
        return result.data;
    })
}


let indexToPlay = 0;
function createDomPlay(result){
    while(mainQuizContaier.firstChild){
        mainQuizContaier.removeChild(mainQuizContaier.lastChild);
    }
    let data = result[indexToPlay];
    let headerQuiz = document.createElement('div');
    headerQuiz.classList = 'header_quiz';
    let title = document.createElement('div');
    title.classList = 'title_quiz h3';
    title.textContent = data.title;
    headerQuiz.appendChild(title);

    const QUESTION_NOW = indexToPlay + 1 + '/' + result.length;
    let numberOfQuestion = document.createElement('div');
    numberOfQuestion.classList = 'quiz_score';
    numberOfQuestion.textContent = QUESTION_NOW;
    headerQuiz.appendChild(numberOfQuestion);
    mainQuizContaier.appendChild(headerQuiz);

    let bodyQuiz = document.createElement('div');
    bodyQuiz.classList = 'body_quiz';
    let numberOfAnswer = data.choices.length;
    let numberOfHalfAn = numberOfAnswer/2;
    const NUMBER_OF_LOOP = Math.round(numberOfHalfAn / 1) * 1;
    console.log(NUMBER_OF_LOOP);
    // Define correct answer number
    correctAnwser = data.correct.length;
    console.log(correctAnwser);
    let indexOfAn = 0;
    for(let i=0;i<NUMBER_OF_LOOP;i++){
        let answerCon = document.createElement('div');
        answerCon.classList = 'd-flex';
        bodyQuiz.appendChild(answerCon);
        for(let j=0;j<NUMBER_OF_LOOP;j++){
            if(data.choices[indexOfAn]!=undefined){
                let answer = document.createElement('div');
                answer.classList = 'answer';
                answer.id = indexOfAn;
                answer.textContent = data.choices[indexOfAn];
                answerCon.appendChild(answer);
            }
            indexOfAn += 1;
        }
    }
    mainQuizContaier.appendChild(bodyQuiz);
}


let numberOfClick = 0;
function clickAnswer(e) {
    e.preventDefault();
    if (e.target.className === "answer") {
      let id = e.target.id;
      numberOfClick+=1;
      e.target.style.backgroundColor = '#1E90FF';
      if(numberOfClick==correctAnwser){
          indexToPlay += 1;
          playQuiz();
          numberOfClick = 0;
      }
    }
}

function playQuiz(){
    getQuestion()
}
playQuiz()

let mainQuizContaier = document.getElementById('play_quiz_container');
mainQuizContaier.addEventListener('click', clickAnswer);