const URL = 'http://localhost:' + 3000;
let userId = localStorage.getItem('userId');



function hide(e){
    e.style.display = 'none';
}

function show(e){
    e.style.display = '';
}

function showLogin(){
    hide(signupForm);
    show(loginForm);
}

function showSignup(){
    hide(loginForm);
    show(signupForm);
}

function getValueFromSignUp(){
    let signInValue = {};
    signInValue['first_name'] = firstName.value;
    signInValue['last_name'] = lastName.value;
    signInValue['email'] = emailSignUp.value;
    if(pS1.value == pS2.value){
        signInValue['password'] = pS1.value;
    }else{
        pS1.style.border = '1px solid #fa0000';
        pS2.style.border = '1px solid #fa0000';
    }
    console.log(signInValue);
    return signInValue;
}


function getValueFromSignIn(){
    let loginValue = {};
    loginValue['email'] = emailLogin.value;
    loginValue['password'] = pswLogin.value;
    console.log(loginValue);
    return loginValue;
}

function registerAccount(){
    let data = getValueFromSignUp();
    axios.post(URL+'/user/register', data)
    .then((result)=>{
        console.log(result);
    })
}

function loginAccount(){
    let data = getValueFromSignIn();
    console.log(data);
    axios.post(URL+'/user/login', data)
    .then((result)=>{
        console.log(result);
        window.location.href = '/'
    })
}

function logoutAccount(){
    localStorage.setItem("userId", '');
    axios.get(URL+"/user/logout")
    window.location.href = "/user/logout";
}

let user = {};
axios.get(URL+'/user/id/'+userId)
.then((result)=>{
    console.log(result);
    user = result.data;
})
// function getValueUserById(){
// }

function listUserInfo(){
    userInfo[0].value = user['first_name']
    userInfo[1].value = user['last_name']
    userInfo[2].value = user['email']

    userInfo[0].disabled = true;
    userInfo[1].disabled = true;
    userInfo[2].disabled = true;
}

let loginForm = document.getElementById('signin_form');
let signupForm = document.getElementById('signup_form');
let userForm = document.getElementById('account_user');
let linkSignup = document.getElementById('link_signup');
let linkSignin = document.getElementById('link_signin');

// get value from input (sign up)
let firstName = document.getElementById('f_name');
let lastName = document.getElementById('l_name');
let emailSignUp = document.getElementById('email_r');
let pS1 = document.getElementById('psw_1');
let pS2 = document.getElementById('psw_2');

// get value from input (login)
let emailLogin = document.getElementById('email_l')
let pswLogin = document.getElementById('psw_l')

// get value user informationo
let userInfo = document.getElementsByClassName('user_info');

let btnSignIn = document.getElementById('login');
let btnSignUp = document.getElementById('sign_in');
let btnLogout = document.getElementById('logout');

btnSignUp.addEventListener('click', registerAccount);
btnSignIn.addEventListener('click', loginAccount);
btnLogout.addEventListener('click', logoutAccount);
linkSignin.addEventListener('click', showLogin);
linkSignup.addEventListener('click', showSignup);


hide(signupForm);
if(userId!=''){
    setTimeout(listUserInfo, 100)
    hide(loginForm)
}else{
    hide(userForm)
}
