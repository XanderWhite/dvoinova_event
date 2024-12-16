// Получаем элемент
const elements = document.querySelectorAll(".how__row");
const introContainer = document.querySelector(".intro__content__container");
const services = document.querySelectorAll(".service");

window.addEventListener("scroll", () => {
	checkHow();
	checkIntro();
	checkService();
});

window.addEventListener("load", () => {
	checkIntro();
});

//Проверяем высоту блока how
function checkHow() {
	elements.forEach((element) => {
		const rect = element.getBoundingClientRect();
		const items = element.querySelectorAll(".how__item");

		items[0].classList.add("left");
		items[1].classList.add("right");

		if (rect.top * 1.1 <= window.innerHeight) {
			items[0].classList.add("active");
			items[1].classList.add("active");
		} else {
			items[0].classList.remove("active");
			items[1].classList.remove("active");
		}
	});
}

//Проверяем высоту блока intro
function checkIntro() {
	const rect = introContainer.getBoundingClientRect();

	if (rect.top * 1.05 <= window.innerHeight) {
		introContainer.classList.add("active");
	} else {
		introContainer.classList.remove("active");
	}
}

//Проверяем высоту карточек service
function checkService() {
	services.forEach((s) => {
		const rect = s.getBoundingClientRect();

		if (window.innerWidth >= 990 || window.innerWidth < 450) {
			if (rect.top + 200 <= window.innerHeight) {
				s.classList.remove("rotated");
			} else {
				s.classList.add("rotated");
			}
		}else{
			if (rect.top + 200 <= window.innerHeight) {
				s.classList.remove("show-back");
			} else {
				s.classList.add("show-back");
			}
		}
	});
}
