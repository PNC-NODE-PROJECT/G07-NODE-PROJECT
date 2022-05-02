
const QUIZ_ID_KEYS = 'playQuizId';
const USER_ID = 'userId';
localStorage.setItem(QUIZ_ID_KEYS, '');
// localStorage.setItem(USER_ID, '');
const URLS = 'http://localhost:' + 3000;

var key = '';
axios.get(URLS+'/user/email')
.then((result)=>{
    console.log(result.data);
    key = result.data
})


var userTemp = '';
function getValueFromUser(){
    axios.get(URLS+'/user/email/'+key)
    .then((result)=>{
        console.log(result);
        userTemp = result.data._id 
        let firstN = result.data.first_name
        let lastN = result.data.last_name
        if(userTemp!==undefined){
            account.textContent = firstN + " " + lastN
            localStorage.setItem(USER_ID, userTemp);
        }else{
            account.textContent = "Account"
        }
    })
}

setTimeout(getValueFromUser, 100);

let account = document.getElementById('account_name');
