var signUpNameInput = document.getElementById("signUpNameInput");
var signUppasswordInput = document.getElementById("signUppasswordInput");
var signUpemailInput = document.getElementById("signUpemailInput");

var signInemailInput = document.getElementById("signInemailInput");
var signInpasswordInput = document.getElementById("signInpasswordInput");

var usersArr = [];

if (localStorage.getItem("users") != null) {
    usersArr = JSON.parse(localStorage.getItem("users"))

}
function isEmailExist() {
    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email.toLowerCase() == signUpemailInput.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function isEmpty() {
    if (signUpNameInput.value == "" || signUppasswordInput.value == "" || signUpemailInput.value == "") {
        return false
    } else {
        return true
    }
}




function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    if (isEmailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return false;
    }

    var user = {
        name: signUpNameInput.value,
        email: signUpemailInput.value,
        pass: signUppasswordInput.value,
    };

    usersArr.push(user);
    localStorage.setItem('users', JSON.stringify(usersArr));
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';

    setTimeout(() => {
        window.location.href = "index.html"; 
    }, 1000);
}



function isLoginEmpty() {

    if (signInpasswordInput.value == "" || signInemailInput.value == "") {
        return false
    } else {
        return true
    }
}


function signIn() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    var pass = signInpasswordInput.value;
    var email = signInemailInput.value;

    var found = false;

    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email === email && usersArr[i].pass === pass) {
            localStorage.setItem('currentUser', usersArr[i].name);
            window.location.href = "home.html";
            found = true;
            break;
        }
    }

    if (!found) {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}



var username = localStorage.getItem('currentUser');
var usernameEl = document.getElementById('username');

if (usernameEl) {
    if (username) {
        usernameEl.innerHTML = "Welcome " + username;
    } else {
        window.location.href = "index.html"; 
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}

