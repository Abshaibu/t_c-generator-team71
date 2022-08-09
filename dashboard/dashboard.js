const expander = document.querySelector('.sidebar-expander');
const sidebar = document.querySelector('.sidebar');
const aside = document.querySelector('aside');
const openModal = document.querySelector('.modal-wrapper');
const modalOne = document.querySelector('.modal1');
const modalTwo = document.querySelector('.modal2');
const toggler = document.querySelectorAll('.toggler');
const modalOnes = document.querySelectorAll('.modal1-btn');
const modalTwos = document.querySelectorAll('.modal2-btn');
const body = document.querySelector('body');


// Sidebar Toggler
expander.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-collapsed');
    aside.classList.toggle('sidebar-collapsed');
})

// Navbar Toggler
toggler.forEach(toggle => {
    toggle.addEventListener('click', () => {
        aside.classList.toggle('navbar-toggler');
    })
})

// New Terms Modal
modalOnes.forEach(modal => {
    modal.addEventListener('click', (e) => {
        modalOne.classList.toggle('modal');
        body.classList.toggle('no-scroll');
        openModal.classList.remove('changes');
        modalTwo.classList.remove('changes');
    })
})

// New Policy Modal
modalTwos.forEach(modal2 => {
    modal2.addEventListener('click', (e) => {
        modalTwo.classList.toggle('modal');
        modalTwo.classList.remove('changes');
        body.classList.toggle('no-scroll');
        openModal.classList.remove('changes');
    })
})


// Business Conditions Details Form
const bizDetails = document.querySelector(".conditions-details");
bizDetails.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bizDetails);
    const data = Object.fromEntries(formData);
    modalOne.classList.add('add-progress');
    body.classList.toggle('no-scroll');
    document.querySelector('.heading').innerHTML = 'Preview';

    setTimeout(() => {
        modalOne.classList.toggle('modal');
        modalOne.classList.remove('changes');
        modalOne.classList.remove('add-progress');
        modalTwo.classList.remove('changes');
        document.querySelectorAll('.preview-cons').forEach(view => {
            view.innerHTML = preview;
        })

        bizDetails.reset();
    }, 300);
    console.log(data);
})

// Business Privacy Details Form
const priDetails = document.querySelector(".privacy-details");
priDetails.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(priDetails);
    const data = Object.fromEntries(formData);

    modalTwo.classList.add('add-progress');
    body.classList.toggle('no-scroll');
    document.querySelector('.heading').innerHTML = 'Preview';

    setTimeout(() => {
        modalTwo.classList.toggle('modal');
        modalTwo.classList.remove('changes');
        modalTwo.classList.remove('add-progress');
        priDetails.reset();
        document.querySelectorAll('.preview').forEach(view => {
            view.innerHTML = preview;
        })
    }, 300);
    console.log(data);
})

// Switching Form Content
const switchForms = document.querySelectorAll('.switch-form');
switchForms.forEach(swap => {
    swap.addEventListener('click', () => {
        openModal.classList.toggle('changes');
        openModal.classList.remove('add-progress');
        modalTwo.classList.toggle('changes');
        modalTwo.classList.remove('add-progress');
    })
})

// Tabs Switcher
$(document).ready(function () {
    $('.tab-a').click(function () {
        $(".tab").removeClass('tab-active');
        $(".tab[data-id='" + $(this).attr('data-id') + "']").addClass("tab-active");
        $(".tab-a").removeClass('active-a');
        $(this).parent().find(".tab-a").addClass('active-a');
    });
});

// Preview Template
let tempName = 'kk';
const preview = `
       <div class="show-preview">
        <h1 class="preview-heading">Preview of your ${tempName} Document</h1>
        <div class="preview-wrapper">
            <div class="inner-preview">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse ducimus at, culpa
                    dignissimos delectus totam similique nam molestiae facilis reprehenderit,
                    consequuntur dolorum incidunt error laudantium magnam harum repellat nulla
                    accusantium, autem voluptas. Qui, minima sequi quidem eligendi exercitationem
                    eos aut voluptatibus non architecto numquam, earum repudiandae sapiente pariatur
                    nemo neque!</p>
            </div>
            <div class="preview-ctas">
                <button class="preview-btn preview-edit">
                    <img src="edit-2.svg" alt="pen icon">
                    Edit
                </button>
                <button class="preview-btn preview-save">
                    <img src="folder-add.svg" alt="folder icon">
                    Save
                </button>
                <div>
                    <button class="preview-btn preview-more">
                        <img src="more.svg" alt="3 black dots  icon stacked on eachother">
                    </button>
                    <div class="more">
                        <button>
                            <img src="share.svg" alt="share icon">
                            Share
                        </button>
                        <button>
                            <img src="download.svg" alt="download icon">
                            Download
                        </button>
                        <button>
                            <img src="export.svg" alt="export icon">
                            Export
                        </button>
                        <button>
                            <img src="embed.svg" alt="embed icon">
                            Embed
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
        `;

// More Options Modal
const moreOptions = document.querySelector('.more');
moreOptions.addEventListener('click', () => {
    moreOptions.classList.toggle('show-more');

})