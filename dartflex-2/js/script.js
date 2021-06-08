const btnSubscribe = document.querySelectorAll('.btn'),
      popup = document.querySelectorAll('.popup'),
      popupClose = document.querySelectorAll('.popup__close'),
      videoBtn = document.querySelector('.header__play');

console.log('init js');

btnSubscribe.forEach(item => {
    item.addEventListener('click', () => {
        popup[0].classList.add('popup__open');
    });
});

videoBtn.addEventListener('click', () => {
    popup[1].classList.add('popup__open');
});

popupClose.forEach((item, i) => {
    item.addEventListener('click', () => {
        popup[i].classList.remove('popup__open');
    });
});

popup.forEach(item => {
    item.addEventListener('click', e => {
        const target = e.target;
    
        if (target === item) {
            item.classList.remove('popup__open');
        }
    });
});

