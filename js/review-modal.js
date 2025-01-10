const reviewModal = document.getElementById("review-modal");
const reviewModalCloseBtn = document.getElementById("review-modal__close-btn");
const reviewShowModalBtn = document.getElementById("review-showModal-btn");
const mask = document.querySelector(".mask");

reviewShowModalBtn.addEventListener("click", () => {
	document.body.classList.add("no-scroll");
	reviewModal.showModal();
	document.getElementById("name-input").focus();
});

reviewModalCloseBtn.addEventListener("click", () => {
	reviewModal.close();
	document.body.classList.remove("no-scroll");
});



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('review-form');
    const fileInput = document.getElementById('review-file-input'); // Поле для загрузки файла

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

          if(!formValidate(form)){
            alert("Заполните обязательные поля");
            return;
          }

          mask.classList.add("active");
            // Создаем объект FormData
            const formData = new FormData(form);

            // Если файл выбран, добавляем его в FormData
            if (fileInput.files.length > 0) {
                formData.append('image', fileInput.files[0]);
            }

            // Отправляем данные на сервер
            fetch('../php/modal-review.php', {
                method: 'POST',
                body: formData // Отправляем FormData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);

                if (reviewModal && typeof reviewModal.close === 'function') {
                    reviewModal.close();
                }

                alert('Ваш отзыв успешно отправлен!');
                form.reset(); // Очистка формы
                mask.classList.remove("active");
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Произошла ошибка при отправке отзыва.');
                mask.classList.remove("active");
            });
        });
    } else {
        console.error('Форма с id "review-form" не найдена.');
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('review-form');

//     if (form) {
//         form.addEventListener('submit', (event) => {
//             event.preventDefault();

//             const formData = new FormData(event.target);
//             const data = Object.fromEntries(formData.entries());

//             fetch('../php/modal-review.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Success:', data);
//                 if (reviewModal && typeof reviewModal.closeModal === 'function') {
//                     reviewModal.closeModal();
//                 }
//                 alert('Ваш отзыв успешно отправлен!');
//                 form.reset(); // Очистка формы
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 alert('Произошла ошибка при отправке отзыва.');
//             });
//         });
//     } else {
//         console.error('Форма с id "review-form" не найдена.');
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('review-file-input');
    const filePreview = document.getElementById('review-file-preview');
    const clearFormBtn = document.getElementById('review-clear-form-btn');
    const textarea = document.getElementById('review-input');

    // Обработчик для загрузки файла
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Создаем миниатюру
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                filePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Обработчик для кнопки очистки формы
    clearFormBtn.addEventListener('click', function () {
        textarea.value = ''; // Очищаем текстовое поле
        fileInput.value = ''; // Очищаем поле выбора файла
        filePreview.innerHTML = ''; // Убираем миниатюру
        filePreview.style.display = 'none'; // Скрываем блок миниатюры
    });
});
