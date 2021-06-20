window.addEventListener('DOMContentLoaded', () => {
    // modile menu
    const mobBtn = document.querySelector('.btn-mobile_menu');
    const mobNav = document.querySelector('.nav-top');
    console.log('init js');

    mobBtn.addEventListener('click', () => {
        mobBtn.classList.toggle('open');
        mobNav.classList.toggle('open');
    }); 

    // modal

    const modal = document.querySelector('.modal-block');
    const btns = document.querySelectorAll('.button');
    const modalClose = document.querySelector('.modal-close');

    btns.forEach(item => {
        item.addEventListener('click', () => {
            modal.classList.toggle('modal-active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('modal-active');
    });
});