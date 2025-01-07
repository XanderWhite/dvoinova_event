const gallery = document.getElementById("photo");
const modalGallery = document.getElementById("modal-gallery");
const modalContent = document.getElementById("modal-content");
const closeButton = document.getElementById("modal-gallery__close-btn");
let currentSlide = 0;

fetch("../php/get_images.php") // (ajax_object.get_images_url)
	.then((response) => response.json())
	.then((data) => {
		images = data;
		let limit = 9;
		const pathname = window.location.pathname;

		if (pathname === "/" || pathname === "/index.html") //	if (ajax_object.is_home)
			limit = images.length > limit  ? limit : images.length;
		else limit = images.length;

		// Динамическое создание галереи
		images.forEach((src, index) => {
			if (index >= limit) return;

			const img = document.createElement("img");
			img.src = src;
			img.alt = src;
			img.classList.add("photo-img");
			img.addEventListener("click", () => {
				document.body.classList.add("no-scroll");
				currentSlide = index;
				modalGallery.showModal();

				$(".slider-modal")
					.slick({
						infinite: true,
						fade: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						adaptiveHeight: true,
					})
					.slick("slickGoTo", index);
			});
			gallery.appendChild(img);

			addImgToModalSlider(src);
		});

		updateDisplay();
	})
	.catch((error) => console.error("Error:", error));

function addImgToModalSlider(src) {
	const img = document.createElement("img");
	img.src = src;
	img.alt = src;
	img.classList.add("slider-img");
	const div = document.createElement("div");
	div.classList.add("slider-item");
	div.appendChild(img);
	modalContent.appendChild(div);
}

// Закрыть модальное окно
closeButton.addEventListener("click", () => {
	closeModal();
});

//закрыть модальное окно нажатием esc
window.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		if (modalGallery.open) closeModal();
	}
});

//акрывает модальное окно
function closeModal() {
	$(".slider-modal").slick("unslick");
	modalGallery.close();
	document.body.classList.remove("no-scroll");
}

const updateDisplay = () => {
	const pathname = window.location.pathname;

	if (pathname === "/" || pathname.endsWith("index.html")) { //if (ajax_object.is_home) {
		const display = window.innerWidth >= 767 ? "none" : "block";

		const items = document.querySelectorAll(".photo-img");

		if (items.length == 9) items[8].style.display = display;
	}
};

// // Устанавливаем отображение при загрузке страницы
// document.addEventListener('DOMContentLoaded', updateDisplay);

// Добавляем слушатель события при изменении размера окна
window.addEventListener("resize", () => {

		updateDisplay();

		// Хранит индекс текущего слайда
		if ($(".slider-modal").hasClass("slick-initialized")) {
			currentSlide = $(".slider-modal").slick("slickCurrentSlide");

			$(".slider-modal").slick("unslick");

			$(".slider-modal")
				.slick({
					infinite: true,
					fade: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
				})
				.slick("slickGoTo", currentSlide);
		}
});
