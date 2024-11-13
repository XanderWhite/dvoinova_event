const gallery = document.getElementById("photo");
const modal = document.getElementById("modal-gallery");
const modalContent = document.getElementById("modal-content");
const closeButton = document.getElementById("modal-close");

fetch("get_images.php")
	.then((response) => response.json())
	.then((data) => {
		images = data;
		let limit = 9;
		const pathname = window.location.pathname;

		if (pathname === "/" || pathname === "/index.html")
			limit = images.length > limit ? limit : images.length;
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
				modal.showModal();

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
		if (modal.open) closeModal();
	}
});

//акрывает модальное окно
function closeModal() {
	$(".slider-modal").slick("unslick");
	modal.close();
	document.body.classList.remove("no-scroll");
}

const updateDisplay = () => {
	const pathname = window.location.pathname;

	if (pathname === "/" || pathname.endsWith("index.html")) {
		const display = window.innerWidth >= 767 ? "none" : "block";

		const items = document.querySelectorAll(".photo-img");

		if (items.length == 9)
		items[8].style.display = display;
	}
};

// // Устанавливаем отображение при загрузке страницы
// document.addEventListener('DOMContentLoaded', updateDisplay);

// Добавляем слушатель события при изменении размера окна
window.addEventListener("resize", updateDisplay);
