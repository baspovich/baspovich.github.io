const btnSubscribe = document.querySelectorAll('.btn'),
      popup = document.querySelector('.popup'),
      popupClose = document.querySelector('.popup__close');

console.log('init js');

btnSubscribe.forEach(item => {
    item.addEventListener('click', () => {
        popup.classList.add('popup__open');
    });
});

popupClose.addEventListener('click', () => {
    popup.classList.remove('popup__open');
});

popup.addEventListener('click', e => {
    const target = e.target;

    if (target === popup) {
        popup.classList.remove('popup__open');
    }
});

