windows.addEventListener('DOMContentLoaded', () => {
    const mobBtn = document.querySelector('.btn-mobile_menu');
    const mobNav = document.querySelector('.nav-top');

    mobBtn.addEventListener('click', () => {
        mobBtn.classList.toggle('open');
        mobNav.classList.toggle('open');
    }); 
});