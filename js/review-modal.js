document.addEventListener("DOMContentLoaded", () => {
	const showModalBtn = document.getElementById("review-showModal-btn");

	const modal = document.getElementById("review-modal");
	const modalCloseBtn = modal.querySelector("#review-modal__close-btn");
	const mask = modal.querySelector(".mask");

    const form = modal.querySelector("#review-form");

    const fileInput = form.querySelector("#review-file-input");
    const filePreview = form.querySelector("#review-file-preview");
    const clearFormBtn = form.querySelector("#review-clear-form-btn");

	//открываем модальное окно
	showModalBtn.addEventListener("click", () => {
		document.body.classList.add("no-scroll");
		modal.showModal();
		document.getElementById("author-input").focus();
	});

	//закрываем модальное окно
	modalCloseBtn.addEventListener("click", () => {
        if (modal && typeof modal.close === "function") {
            modal.close();
            document.body.classList.remove("no-scroll");
        }
	});

    //обрабатываем отправку формы
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!formValidate(form)) {
			alert("Заполните обязательные поля");
			return;
		}

		mask.classList.add("active");
		// Создаем объект FormData
		const formData = new FormData(form);

		// Если файл выбран, добавляем его в FormData
		if (fileInput.files.length > 0) {
			formData.append("image", fileInput.files[0]);
		}

		// Отправляем данные на сервер
		fetch("../php/modal-review.php", {
			method: "POST",
			body: formData, // Отправляем FormData
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success:", data);

				if (modal && typeof modal.close === "function") {
					modal.close();
				}

				alert("Ваш отзыв успешно отправлен!");
				form.reset();
				mask.classList.remove("active");
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("Произошла ошибка при отправке отзыва.");
				mask.classList.remove("active");
			});
	});


	// Обработчик для загрузки файла
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                //создаем миниатюру
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                filePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            alert("Пожалуйста, выберите изображение.");
            fileInput.value = ""; // Очищаем поле выбора файла
        }
    });


	// Функция для очистки миниатюры
function clearPreview() {
    filePreview.innerHTML = ""; // Очищаем миниатюру
    filePreview.style.display = "none"; // Скрываем блок миниатюры
}

// Обработчик события reset для формы
form.addEventListener("reset", function (event) {
    clearPreview(); // Очищаем миниатюру при сбросе формы
});

// Обработчик клика на кнопке очистки формы
clearFormBtn.addEventListener("click", function () {
    form.reset(); // Сбрасываем форму
});

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
//                 if (modal && typeof modal.closeModal === 'function') {
//                     modal.closeModal();
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


