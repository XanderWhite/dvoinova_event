const menu = document.querySelector('.nav'),
    btnMenu = document.querySelector('.btn-menu');

// Header

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        const header = document.getElementById('header');
        const headerOffset = header.offsetHeight; // Высота фиксированного меню
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // Плавная прокрутка
        });

        if(window.innerWidth < 992){
            menu.classList.toggle('open');
            btnMenu.classList.toggle('active');
        }
    });
});


//btn-menu

btnMenu.addEventListener('click',() => {
    menu.classList.toggle('open');
    btnMenu.classList.toggle('active');
});


//=========================
//sosial

const DEFAULT_COLOR = '#9e929e';

let socials = document.querySelectorAll('.social__link');

socials.forEach(item => {
    const color = item.getAttribute('data-color');

    item.addEventListener('mouseenter', () => {
        updateIconsColor(item, color);
    });

    item.addEventListener('mouseleave', () => {
        resetStyles(item);
    });

    item.addEventListener('focus', () => {

        updateIconsColor(item, color);
    });

    item.addEventListener('blur', () => {
        resetStyles(item);
    });
});

// Функция для обновления цвета иконок
function updateIconsColor(item, color) {
    item.style.borderColor = color;

    const icons = item.querySelectorAll('.fill-color');
    icons.forEach(icon => icon.style.fill = color);
}

// Функция для сброса стилей
function resetStyles(item) {
    item.style.borderColor = DEFAULT_COLOR;
    const icons = item.querySelectorAll('.fill-color');
    icons.forEach(icon => icon.style.fill = DEFAULT_COLOR);
}

//Map
// const address = "Москва, Красная площадь, 1";
//     const mapLink = document.getElementById('map-link');

//     mapLink.href = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
//     mapLink.target = "_blank";

