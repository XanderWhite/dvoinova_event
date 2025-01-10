
document.addEventListener('DOMContentLoaded', function () {
const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        990: {
            slidesPerView: 3, // Показывать по 3 слайда
        },
        0: {
            slidesPerView: 1, // Показывать по 1 слайду
        }
    },
    autoplay: {
        delay: 5000, // Автопрокрутка через 3 секунды
        disableOnInteraction: true, //Отключать автопрокрутку при взаимодействии
    },
    spaceBetween: 20
});
});