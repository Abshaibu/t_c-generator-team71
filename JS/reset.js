const form = document.getElementById('form');
const password = document.getElementById('password');
const incorrect = document.querySelector('.incorrect');
const errorText = document.querySelector('.error-text');
form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();
    
    if (validateForm() === true) {
        let data = {};
        let link = window.location.href;
        const linkToken = link.slice(47);
        // const linkToken = link.slice(33);
        console.log(linkToken);
        data = {
            password: password.value,
            token: linkToken
        };

        fetch('https://termsbuddy.herokuapp.com/api/password-reset/confirm/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                document.querySelector('.success').style.display = 'block';
                form.reset();
            } else {
                password.nextElementSibling.style.display = 'flex';
                errorText.innerHTML = 'Password must be at least 8 characters long';
            }
            console.log(res);
            return res.json()
        }).then(data => console.log(data))
            .catch(error => console.log(error));
    } else {

    }
})


// Show or Hide Password Value
const xIcon = document.querySelector('.eye-off');
xIcon.addEventListener('click', () => {
    if (password.type === 'password') {
        password.setAttribute('type', 'text')
        //remove the original attribute then set a new attribute with a diffrent src path [your alternate icon]
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye.svg')
    } else {
        //reset
        password.setAttribute('type', 'password')
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye-slash.svg')
    }
})

// close success message
document.querySelector('.success-close').addEventListener('click', () => {
    document.querySelector('.success').style.display = 'none';
})

// Validate Form
const input = document.querySelector('.form-input');
input.addEventListener('change', () => {
    input.nextElementSibling.style.display = 'none';
    input.style.borderColor = '#BABABA';
})

function validateForm() {
    let passwordValid = checkPassword();
    let formValid = passwordValid;
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

// check 
const checkPassword = () => {
    let valid = false;
    if (isRequired(password.value) === false) {
        valid = true;
    } else {
        errorText.innerHTML = 'Password cannot be blank';
        password.nextElementSibling.style.display = 'flex';
        password.style.borderColor = '#ED4A1F';
    }
    return valid
}