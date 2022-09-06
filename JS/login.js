const form = document.querySelector('.form')
const inputType = document.getElementById('password')
const email = document.getElementById('email')
const xIcon = document.querySelector('.eye-off')
const signinBtn = document.querySelector('.signin-btn')
const errMsg = document.querySelectorAll('.error-message')
const errEmail = document.querySelector('.error-email')
const errPassword = document.querySelector('.error-password')
const incorrect = document.querySelector('.incorrect')
const incorrectText = document.querySelector('.incorrect-text')
const spinner = document.querySelector('.spinner-wrapper');
const baseUrl = 'https://termsbuddy.herokuapp.com/api';

//onclick, check if the input type is [password] if it is, switch the input type [text] 
xIcon.addEventListener('click', () => {
    if (password.type === 'password') {
        inputType.setAttribute('type', 'text')
        //remove the original attribute then set a new attribute with a diffrent src path [your alternate icon]
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye.svg')
    } else {
        //reset
        inputType.setAttribute('type', 'password')
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye-slash.svg')
    }
})

const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    
    if (validateForm() === true) {
        spinner.style.display = 'flex';
        signinBtn.style.color = '#2b7a78';
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        fetch(`${baseUrl}/users/obtain-token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 201) {
                window.location.href = 'https://abshaibu.github.io/test-P71/dashboard/dashboard.html'
                // window.location.href = 'http://127.0.0.1:5500/dashboard/dashboard.html';
            } else {
                spinner.style.display = 'none';
                signinBtn.style.color = '#FEFEFE';
                incorrect.style.display = 'flex';
                incorrectText.innerHTML = 'Incorrect email or password';
            }
            return res.json();
        }).then(data => {
            authToken = {
                refresh: data.tokens.refresh,
                access: data.tokens.access,
                id: data.id
            }
            localStorage.setItem('credentials', JSON.stringify(authToken));
            return authToken;
        }).then({

        }).catch(error => console.log(error));
    } else {}
})

// Validate Form
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => { 
    input.addEventListener('blur', () => {
        input.nextElementSibling.style.display = 'none';
        input.style.borderColor = '#BABABA';
        document.querySelector('.mail').innerHTML = 'Email cannot be blank';
        incorrectText.innerHTML = 'Password cannot be blank';
    })
})

function validateForm() {
    let emailValid = checkEmail();
    let passwordValid = checkPassword()
    let formValid = emailValid && passwordValid;
    return formValid;
}

// Check if input field is empty
const isRequired = (value) => {
    if (value.trimStart() === '') {
        return true
    } else {
        return false
    }
}

// Check that email is valid
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// check 
const checkEmail = () => {
    let valid = false;
    if (isRequired(email.value) === false && isEmailValid(email.value)) {
        valid = true;
    } else if (isRequired(email.value) === false && isEmailValid(email.value) === false) {
        email.nextElementSibling.style.display = 'flex';
        document.querySelector('.mail').innerHTML = 'Email is not valid';
        email.style.borderColor = '#ED4A1F';
    } else {
        email.nextElementSibling.style.display = 'flex';
        email.style.borderColor = '#ED4A1F';
    }
    return valid
}

const checkPassword = () => {
    let valid = false;
    if (isRequired(inputType.value)) {
        inputType.nextElementSibling.style.display = 'flex';
        inputType.style.borderColor = '#ED4A1F';
    } else {
        valid = true;
    }
    return valid
}