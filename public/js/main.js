if (!localStorage['userId']) {
    window.location.href = '../register/register.html';
}
var key = localStorage['userId'];

var userTemp = '';
function getValueFromUser(){
    axios.get('/user/id/'+key)
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
