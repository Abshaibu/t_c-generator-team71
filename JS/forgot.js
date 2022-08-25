const form = document.getElementById('form');
const incorrect = document.querySelector('.error-message');
const incorrectText = document.querySelector('.incorrect-text');
const email = document.getElementById('email');
form.addEventListener('submit', e => {
    e.preventDefault();
    if (incorrect) {
        incorrect.style.display = 'none';
    }

    if (email.value === '') {
        incorrect.style.display = 'flex';
        incorrectText.innerHTML = 'Email cannot be blank';
    } else if (email.value != '') {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.value.match(validRegex)) {
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
                    incorrect.style.display = 'flex';
                    incorrectText.innerHTML = 'Email is not registered';
                } else {
                    document.querySelector('.success').style.display = 'block';
                    form.reset();
                }
                return res.json()
            }).then(data => console.log(data))
                .catch(error => console.log(error));
        } else {
            incorrect.style.display = 'flex';
            incorrectText.innerHTML = 'Email is not valid';
        }
    }
    else{
    }
})

// close success message
document.querySelector('.success-close').addEventListener('click', () => { 
    document.querySelector('.success').style.display = 'none';
})