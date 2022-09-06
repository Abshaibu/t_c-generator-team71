const form = document.getElementById('form');

const incorrect = document.querySelector('.error-message');
const spinner = document.querySelector('.spinner-wrapper');
const forgotBtn = document.querySelector('.forgot-submit');
const incorrectText = document.querySelector('.incorrect-text');
const email = document.getElementById('email');
form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();

    if (validateForm() === true) {
        spinner.style.display = 'flex';
        forgotBtn.style.color = '#2B7A78';
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            fetch('https://termsbuddy.herokuapp.com/api/password-reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.status === 400) {
                    spinner.style.display = 'none';
                    forgotBtn.style.color = '#FEFEFE';
                    email.nextElementSibling.style.display = 'flex';
                    incorrectText.innerHTML = 'Email is not registered';
                } else {
                    spinner.style.display = 'none';
                    forgotBtn.style.color = '#FEFEFE';
                    document.querySelector('.success').style.display = 'block';
                    form.reset();
                }
                return res.json()
            }).then(data => data)
                .catch(error => console.log(error));
        } else {}
})

// close success message
document.querySelector('.success-close').addEventListener('click', () => { 
    document.querySelector('.success').style.display = 'none';
})

// Validate Form
const input = document.querySelector('.form-input');
    input.addEventListener('blur', () => {
        input.nextElementSibling.style.display = 'none';
        input.style.borderColor = '#BABABA';
        incorrectText.innerHTML = 'Email cannot be blank';
    })

function validateForm() {
    let emailValid = checkEmail();
    let formValid = emailValid;
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

// check email
const checkEmail = () => {
    let valid = false;
    if (isRequired(email.value) === false && isEmailValid(email.value)) {
        valid = true;
    } else if (isRequired(email.value) === false && isEmailValid(email.value) === false) {
        email.nextElementSibling.style.display = 'flex';
        incorrectText.innerHTML = 'Email is not valid';
        email.style.borderColor = '#ED4A1F';
    } else {
        email.nextElementSibling.style.display = 'flex';
        email.style.borderColor = '#ED4A1F';
    }
    return valid
}