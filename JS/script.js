const selectEl = document.querySelector('.FAQs-section__select')
const arrowIcons = document.querySelector('.FAQs-section__select img')
const answersDropdown = document.querySelector('.FAQs-section__answer-dropdown')


arrowIcons.onclick = displayAnswer;

function displayAnswer() {
    answersDropdown.classList.toggle('active')
    arrowIcons.classList.toggle('active')
}



