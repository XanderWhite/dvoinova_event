const presentModal = document.getElementById("present-modal");
const presentModalCloseBtn = document.getElementById(
	"present-modal__close-btn"
);

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

//Обработка Формы с Заказом подарка

document.addEventListener("DOMContentLoaded", function () {


	const form = document.getElementById("present-form");
	form.addEventListener("submit", formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		//вытягиваем все данные полей
		let formData = new FormData(form);
		//добавляем изображение к данным
		formData.append("image", formImage.files[0]);

		if (!error) {
			form.classList.add("sending");
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



});
