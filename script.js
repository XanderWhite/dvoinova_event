const defaultColor = '#9e929e'

let socials = document.querySelectorAll('.social__item');

socials.forEach(item=>{
item.addEventListener('mouseenter', () => {
    const color = item.getAttribute('data-color');
    item.style.borderColor = color;

    let icon = item.querySelector('.fill-color');
    const icons = item.querySelectorAll('.fill-color');
    icons.forEach(icon => icon.style.fill = color);
});

item.addEventListener('mouseleave', () => {
    item.style.borderColor = defaultColor;
    const icons = item.querySelectorAll('.fill-color');
    icons.forEach(icon => icon.style.fill = defaultColor);
});
});


// //into slider

// const images = document.querySelectorAll('.intro__img');
// const slider = document.querySelector('.intro__images');
// const prevButton = document.querySelector('#introBtnLeft');
// const nextButton = document.querySelector('#introBtnRight');
// let currentIndex = 0;

// function showSlide(index) {
//     // Сдвиг слайдера влево или вправо
//     slider.style.transform = `translateX(-${index * 100}%)`;
// }

// prevButton.addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % images.length; // Увеличиваем индекс, переходим на 0 при достижении конца
//     showSlide(currentIndex);
// });

// nextButton.addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + images.length) % images.length; // Уменьшаем индекс, переход к последнему при достижении начала
//     showSlide(currentIndex);
// });




