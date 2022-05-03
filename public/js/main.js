// const QUIZ_ID_KEYS = 'playQuizId';
const USER_ID = 'userId';
// localStorage.setItem(QUIZ_ID_KEYS, '');
localStorage.setItem(USER_ID, '');
const URLS = 'http://localhost:' + 3000;


var key = '';
axios.get(URLS+'/user/email')
.then((result)=>{
    key = result.data
})


var userTemp = '';
function getValueFromUser(){
    axios.get(URLS+'/user/id/'+key)
    .then((result)=>{
        userTemp = result.data._id 
        let firstN = result.data.first_name
        let lastN = result.data.last_name
        if(userTemp!==undefined){
            account.textContent = firstN + " " + lastN
            account.style.fontSize = '20px';
            localStorage.setItem(USER_ID, userTemp);
        }else{
            account.textContent = "Account"
        }
    })
}

setTimeout(getValueFromUser, 150);

let account = document.getElementById('account_name');
