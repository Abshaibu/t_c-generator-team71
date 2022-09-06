// Open and close FAQ
document.querySelectorAll('.faq-btn').forEach(faq => faq.addEventListener('click', (e) => {
    e.target.parentElement.classList.toggle('open');
}))

// Mobile Nav Toggle Show or Hide
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', (e) => {
    document.querySelector('.mobile-nav').classList.toggle('show-menu');
}))
document.querySelector('.menu-toggler').addEventListener('click', () => {
    document.querySelector('.mobile-nav').classList.toggle('show-menu');
    console.log(document.querySelector('.menu-toggler-img').src);
    document.querySelector('.menu-toggler-img').style.backgroundColor = 'red';
})

// Send Newsletter message
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {email : document.querySelector('#email').value};

    fetch('https://termsbuddy.herokuapp.com/api/users/newsletter/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        res
    }).then(data => {
        data
    }).catch(error => console.log(error));
})