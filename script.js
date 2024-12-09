const menu = document.querySelector('.nav'),
    btnMenu = document.querySelector('.btn-menu');

// Header
const WIDTH_TO_SHOW_BURGER = 992;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        const header = document.getElementById('header');
        const headerOffset = header.offsetHeight; // Высота фиксированного меню
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY;// - headerOffset;

            window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // Плавная прокрутка
        });

        if(window.innerWidth < WIDTH_TO_SHOW_BURGER){
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



//hide header
let lastScrollTop = 0;
const header = document.getElementById('header');
const threshold = 100; // Пороговое значение для срабатывания

window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScrollTop - lastScrollTop) >= threshold) {
        if (currentScrollTop > lastScrollTop) {
            // Скролл вниз
            header.style.transform = 'translateY(-100%)'; // Скрыть хедер
        } else {
            // Скролл вверх
            header.style.transform = 'translateY(0)'; // Показать хедер
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Для мобильных браузеров
    }
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

//Форма отзывов
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

    let error = formValidate(form);

    //вытягиваем все данные полей
    let formData = new FormData(form);
    //добавляем изображение к данным
    formData.append('image', formImage.files[0]);

    if(error===0){
        form.classList.add('_sending');
    let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
    });

    if(response.ok){
    let result = await response.json();
    alert(result.message);
    //после отправки очищаем изображение...
    formPreview.innerHTML = '';
    //и все данные с формы
    form.reset();
    form.classList.remove('_sending');
    }
    else{
    alert('Ошибка');
    form.classList.remove('_sending');
    }
    }
    else{
        alert('Заполните обязательные поля')
    }

    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_phone')){
    if(emailTest(input)){
        formAddError(input);
        error++;
    }}
    else if(input.getAttribute("type")=== "checkbox" && input.checked === false){
        formAddError(input);
        console.log(input.parentElement.classList);
        error++;
    }
    else{
        if(input.value===''){
            formAddError(input);
        error++;
        }
    }
        }

        return error;
    }

    function formAddError(input){
            input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

   //функция теста email
function emailTest(input){
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

/* Modal-review
      ============================ */

//получаем input file в переменную
const formImage = document.getElementById('formImage');

//получаем div для preview в переменную
const formPreview = document.getElementById('formPreview');


//Слушаем изменения в инпуе file
formImage.addEventListener('change',()=>{
    uploadFile(formImage.files[0])
});

 function uploadFile(file){
    //проверяем тип файла
    if(!['image/jpeg','image/png','image/gif'].includes(file.type)){
        alert('разрешены только изображения');
        formImage.value = '';
        return;
    }
    //проверим размер файла (<2 mb)
    if(file.size > 2 * 1024 * 1024){
        alert('Файл должен быть менее 2 МБ');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e){
               formPreview.innerHTML = '<img src='+e.target.result+' alt = "Фото">';
    };
    reader.onerror = function (e) {
        alert('Ошибка');
    };
    reader.readAsDataURL(file);

 }

//Обнуление значения выбранного изображения
  $('#btn-reset-review').on("click", function () {
    formImage.value = '';
    formPreview.innerHTML = '';
});

});


    //Modal
    //==================


const btnShowModalPresent = document.getElementById("btn-showModal-present");
const modalPresent = document.getElementById('modal-present');
const modalPresentCloseBtn = document.getElementById('modal-present__close-btn');
const dateInput = document.getElementById('input_date');


    btnShowModalPresent.addEventListener('click',()=>{
        document.body.classList.add("no-scroll");
				modalPresent.showModal();
                document.getElementById('input_name').focus();
    })

    modalPresentCloseBtn.addEventListener('click',()=>{
        modalPresent.close();
        document.body.classList.remove("no-scroll");
    })


    dateInput.addEventListener('focus', function() {
        dateInput.style.backgroundColor = 'red';
        dateInput.style.color = 'red';
    });

    dateInput.addEventListener('blur', function() {
        if (!dateInput.value) {
            dateInput.style.backgroundColor = 'green';
            dateInput.style.color = 'green';
        }
    });




