//Обработка Формы с Заказом подарка

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("form");
	form.addEventListener("submit", formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		//вытягиваем все данные полей
		let formData = new FormData(form);
		//добавляем изображение к данным
		formData.append("image", formImage.files[0]);

		if (error === 0) {
			form.classList.add("_sending");
			let response = await fetch("sendmail.php", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				//после отправки очищаем изображение...
				formPreview.innerHTML = "";
				//и все данные с формы
				form.reset();
				form.classList.remove("_sending");
			} else {
				alert("Ошибка");
				form.classList.remove("_sending");
			}
		} else {
			alert("Заполните обязательные поля");
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll("._req");

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains("_phone")) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (
				input.getAttribute("type") === "checkbox" &&
				input.checked === false
			) {
				formAddError(input);
				console.log(input.parentElement.classList);
				error++;
			} else {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			}
		}

		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add("_error");
		input.classList.add("_error");
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
	}

	//функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	/* Modal-review
      ============================ */

	//получаем input file в переменную
	const formImage = document.getElementById("formImage");

	//получаем div для preview в переменную
	const formPreview = document.getElementById("formPreview");

	//Слушаем изменения в инпуе file
	formImage.addEventListener("change", () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		//проверяем тип файла
		if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
			alert("разрешены только изображения");
			formImage.value = "";
			return;
		}
		//проверим размер файла (<2 mb)
		if (file.size > 2 * 1024 * 1024) {
			alert("Файл должен быть менее 2 МБ");
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = "<img src=" + e.target.result + ' alt = "Фото">';
		};
		reader.onerror = function (e) {
			alert("Ошибка");
		};
		reader.readAsDataURL(file);
	}

	//Обнуление значения выбранного изображения
	$("#btn-reset-review").on("click", function () {
		formImage.value = "";
		formPreview.innerHTML = "";
	});
});

//===============================
//Modal

const presentModal = document.getElementById("present-modal");
const presentModalCloseBtn = document.getElementById("present-modal__close-btn");

const dateInput = document.getElementById("date-input");
const presentShowModalBtn = document.getElementById("present-showModal-btn");

presentShowModalBtn.addEventListener("click", () => {
	document.body.classList.add("no-scroll");
	presentModal.showModal();
	document.getElementById("name-input").focus();
});

presentModalCloseBtn.addEventListener("click", () => {
	presentModal.close();
	document.body.classList.remove("no-scroll");
});

dateInput.addEventListener("focus", function () {
	dateInput.style.backgroundColor = "red";
	dateInput.style.color = "red";
});

dateInput.addEventListener("blur", function () {
	if (!dateInput.value) {
		dateInput.style.backgroundColor = "green";
		dateInput.style.color = "green";
	}
});
