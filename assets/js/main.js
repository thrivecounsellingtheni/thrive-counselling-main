/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
    
    if(toggle && nav){
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        });
    }
}
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== LANGUAGE LOGIC ====================*/
const updateLanguage = (selectedLang) => {
    const translatableElements = document.querySelectorAll('.tr');
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(opt => {
        opt.classList.remove('active-lang');
        if(opt.getAttribute('data-lang') === selectedLang) {
            opt.classList.add('active-lang');
        }
    });

    translatableElements.forEach(el => {
        const newText = el.getAttribute(`data-${selectedLang}`);
        if(newText) {
            el.innerHTML = newText;
        }
    });

    const homeTitle = document.querySelector('.home__title');
    if (homeTitle) {
        if (selectedLang === 'ta') {
            homeTitle.classList.add('ta-active');
        } else {
            homeTitle.classList.remove('ta-active');
        }
    }

    const homeSubtitle = document.querySelector('.home__subtitle');
    if (homeSubtitle) {
        if (selectedLang === 'ta') {
            homeSubtitle.classList.add('ta-active');
        } else {
            homeSubtitle.classList.remove('ta-active');
        }
    }   

    document.documentElement.classList.toggle('lang-ta', selectedLang === 'ta');

    localStorage.setItem('selectedLanguage', selectedLang);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if(savedLang) {
        updateLanguage(savedLang);
    }

    const homeTitle = document.querySelector('.home__title');
    if (homeTitle && localStorage.getItem('selectedLanguage') === 'ta') {
        homeTitle.classList.add('ta-active');
    }

    const homeSubtitle = document.querySelector('.home__subtitle');
    if (homeSubtitle && localStorage.getItem('selectedLanguage') === 'ta') {
        homeSubtitle.classList.add('ta-active');
    }

    if (window.location.hash === '' || window.location.hash === '#home') {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 50);
    }
});

/*==================== LANGUAGE TOGGLE CLICK ====================*/
const langToggle = document.getElementById('lang-toggle');

if(langToggle){
    langToggle.addEventListener('click', (e) => {
        const target = e.target.closest('.lang-option');
        if(!target) return;

        const selectedLang = target.getAttribute('data-lang');
        updateLanguage(selectedLang);

        const navMenu = document.getElementById('nav-menu');
        if(navMenu){
            navMenu.classList.remove('show-menu');
        }
    });
}

/*==================== CLOSE MENU ON OUTSIDE CLICK ====================*/
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if(!navMenu || !navToggle) return;
    if(!navMenu.classList.contains('show-menu')) return;

    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedToggle = navToggle.contains(e.target);

    if(!clickedInsideMenu && !clickedToggle){
        navMenu.classList.remove('show-menu');
    }
});

/*==================== PERSIST LANGUAGE ON LOAD ====================*/
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if(savedLang) {
        updateLanguage(savedLang);
    }
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 1500,
    reset: true,
    viewFactor: 0.1
});

sr.reveal('.home__data', {
    origin: 'left',
    distance: '50px',
    duration: 1200,
    delay: 100
});

sr.reveal('.home__img-wrapper', {
    origin: 'right',
    distance: '50px',
    duration: 1200,
    delay: 200
});

sr.reveal('.about__intro-outside', { delay: 100 });

sr.reveal('.about__content-box', { 
    interval: 150,
    origin: 'top' 
});

sr.reveal('.values__section', {
    delay: 100,
    distance: '30px'
});


/*===== HOME PAGE - PSYCHOLOGIST SECTION =====*/
sr.reveal('.psychologist__img-wrapper', {
    origin: 'left',
    distance: '50px',
    duration: 1200,
    delay: 100
});

sr.reveal('.psychologist__data', {
    origin: 'right',
    distance: '50px',
    duration: 1200,
    delay: 200
});

sr.reveal('.homeabout__data', {
    origin: 'left',
    distance: '50px',
    duration: 1200,
    delay: 100
});

sr.reveal('.homeabout__img-wrapper', {
    origin: 'right',
    distance: '50px',
    duration: 1200,
    delay: 200
});

sr.reveal('.homeservices__title', {
    origin: 'top',
    distance: '30px',
    duration: 1000,
    delay: 100
});

sr.reveal('.homeservices__card', {
    origin: 'bottom',
    distance: '30px',
    duration: 800,
    interval: 80,
    viewFactor: 0.1
});

sr.reveal('.homecontact__text', {
    origin: 'left',
    distance: '40px',
    duration: 1200,
    delay: 100
});

sr.reveal('.homecontact__btn-wrapper', {
    origin: 'right',
    distance: '40px',
    duration: 1200,
    delay: 200
});

/*==================== PSYCHOLOGIST READ MORE MODAL ====================*/

const psychReadMoreBtn = document.getElementById('psychReadMoreBtn');
const psychModalOverlay = document.getElementById('psychModalOverlay');
const psychModalClose = document.getElementById('psychModalClose');

if (psychReadMoreBtn && psychModalOverlay && psychModalClose) {
        let psychScrollY = 0;

    const openPsychModal = () => {
        psychScrollY = window.scrollY;
        psychModalOverlay.classList.add('psych-modal-open');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${psychScrollY}px`;
        document.body.style.width = '100%';
    };

    const closePsychModal = () => {
        psychModalOverlay.classList.remove('psych-modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, psychScrollY);
    };

    psychReadMoreBtn.addEventListener('click', openPsychModal);
    psychModalClose.addEventListener('click', closePsychModal);

    psychModalOverlay.addEventListener('click', (e) => {
        if (e.target === psychModalOverlay) closePsychModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePsychModal();
    });
}