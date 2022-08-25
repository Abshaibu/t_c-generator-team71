const form = document.querySelector('.form')
const inputType = document.getElementById('password')
const email = document.getElementById('email')
const xIcon = document.querySelector('.eye-off')
const errMsg = document.querySelectorAll('.error-message')
const errEmail = document.querySelector('.error-email')
const errPassword = document.querySelector('.error-password')
const incorrect = document.querySelector('.incorrect')
const incorrectText = document.querySelector('.incorrect-text')
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

    if (email.value === '' && inputType.value === '') {
        errMsg.forEach(err => { 
            err.style.display = 'flex'
        })
    } else if (email.value === '') {
        form.classList.add('error1')
    } else if (inputType.value === '') {
        form.classList.add('error2')
    } else if (email.value.match(validRegex)) {

        if (!email.value.match(validRegex)) {
            errEmail.style.display = 'flex';
            incorrectText.innerHTML = 'Please enter a valid email';
        }
    }
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

})