const URL = 'http://localhost:' + 3000;


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
    })
}

let loginForm = document.getElementById('signin_form');
let signupForm = document.getElementById('signup_form');
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


let btnSignIn = document.getElementById('login');
let btnSignUp = document.getElementById('sign_in');

btnSignUp.addEventListener('click', registerAccount);
btnSignIn.addEventListener('click', loginAccount);
linkSignin.addEventListener('click', showLogin);
linkSignup.addEventListener('click', showSignup);



hide(signupForm);
