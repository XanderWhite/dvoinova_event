let images = [];
let currentIndex = 0;

const gallery = document.getElementById("photo");
const modal = document.getElementById("modal-gallery");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");
const closeButton = document.getElementById("modal-close");
const modalControls = document.getElementById("modal-controls");
const prevButton = document.getElementById("prevImg");
const nextButton = document.getElementById("nextImg");

fetch("get_images.php")
	.then((response) => response.json())
	.then((data) => {
		images = data;
		let limit = 8;
		const pathname = window.location.pathname;

		if (pathname === "/" || pathname === "/index.html")
			limit = images.length > 8 ? 8 : images.length;
		else limit = images.length;

		// Динамическое создание галереи
		images.forEach((src, index) => {
			if (index >= limit) return;

			const img = document.createElement("img");
			img.src = src;
			img.alt = src;
			img.classList.add("photo-img");
			img.addEventListener("click", () => {
				// currentIndex = index;
				// showImage(src);
				document.body.classList.add("no-scroll");
				modal.showModal();

				$('.slider-intro').slick({
					infinite: true,
					fade: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true
				}).slick('slickGoTo', index);


			});
			gallery.appendChild(img);

			addImgToModalSlider(src);
		});
	})
	.catch((error) => console.error("Error:", error));

function addImgToModalSlider(src){
	const img = document.createElement("img");
	img.src = src;
	img.alt = src;
	img.classList.add("slider__img");
	const div = document.createElement("div");
	div.classList.add("slider__item");
	div.appendChild(img);
	modalContent.appendChild(div);
}

// Функция отображения изображения
function showImage(src) {
	modalImage.style.opacity = 0; // Начинаем с затухания
	setTimeout(() => {
		modalImage.src = src;
		modal.showModal();
		modalImage.style.opacity = 1; // Потом показываем изображение
		document.body.classList.add("no-scroll");

	}, 300); // Задержка на время затухания
}

// Закрыть модальное окно
closeButton.addEventListener("click", () => {
	closeModal();

});

//закрыть модальное окно нажатием esc
window.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		if (modal.open) closeModal();
	}
});

//акрывает модальное окно
function closeModal() {
	$('.slider-intro').slick('unslick');
	modal.close();
	document.body.classList.remove("no-scroll");
	currentIndex = 0;

}

// // Переход к предыдущему изображению
// prevButton.addEventListener("click", () => {
// 	currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1; // Циклический переход
// 	showImage(images[currentIndex]);
// });

// // Переход к следующему изображению
// nextButton.addEventListener("click", () => {
// 	currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1; // Циклический переход
// 	showImage(images[currentIndex]);
// });