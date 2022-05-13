let userId = localStorage.getItem('userId');
let validEmail = document.getElementById("validEmail");

function hide(e) {
    e.style.display = 'none';
}

function show(e) {
    e.style.display = '';
}

function showLogin() {
    hide(signupForm);
    show(loginForm);
}

function showSignup() {
    hide(loginForm);
    show(signupForm);
}

function getValueFromSignUp() {
    let signInValue = {};
    signInValue['first_name'] = firstName.value;
    signInValue['last_name'] = lastName.value;
    signInValue['email'] = emailSignUp.value;
    if (pS1.value == pS2.value && (pS1.value !== '' && pS2.value !== '')) {
        signInValue['password'] = pS1.value;
        pS1.style.border = '1px solid #73f362';
        pS2.style.border = '1px solid #73f362';
    } else {
        pS1.style.border = '1px solid #fa0000';
        pS2.style.border = '1px solid #fa0000';
    }
    return signInValue;
}

function checkIsValidInput() {
    let isValid = false;
    if (firstName.value !== '' && lastName.value !== '' & emailSignUp.value !== '' && (pS1.value == pS2.value && (pS1.value !== '' && pS2.value !== ''))) {
        isValid = true;
    }
    return isValid;
}

function getValueFromSignIn() {
    let loginValue = {};
    loginValue['email'] = emailLogin.value;
    loginValue['password'] = pswLogin.value;
    return loginValue;
}

function registerAccount(e) {
    // e.preventDefault();
    let data = getValueFromSignUp();
    axios.get('/user/email/' + data.email).then((result) => {
        if (result.data != "") {
            validEmail.style.display = "block";
        } else {
            axios.post('/user/register', data)
                .then((result) => {
                    if (checkIsValidInput()) {
                        window.location.href = '/views/register/register.html'
                    }
                })
        }
    })
}

async function loginAccount() {
    let data = getValueFromSignIn();
    await axios.post('/user/login', data)
    .then((result) => {
        // window.location.href = '/';
        localStorage.setItem('userId', result.data);
        window.location.href = '/public/index.html'
    })
    window.location.href = '/'
}

function logoutAccount() {
    localStorage.setItem("userId", '');
    axios.get("/user/logout")
}


let user = {};
if(userId!=''){
    axios.get('/user/id/' + userId)
    .then((result) => {
        user = result.data;
    })
}

function listUserInfo() {
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
let item_action_header = document.getElementById("item_action_header")

btnSignUp.addEventListener('click', registerAccount);
btnSignIn.addEventListener('click', loginAccount);
btnLogout.addEventListener('click', logoutAccount);
linkSignin.addEventListener('click', showLogin);
linkSignup.addEventListener('click', showSignup);


hide(signupForm);
if(userId!==''){
    setTimeout(listUserInfo, 100);
    item_action_header.style.display = "flex";
    hide(loginForm)
} else {
    hide(userForm)
}
