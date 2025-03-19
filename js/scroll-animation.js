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

window.addEventListener('resize', checkService);

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
	if(introContainer){
		const rect = introContainer.getBoundingClientRect();

		if (rect.top * 1.05 <= window.innerHeight) {
			introContainer.classList.add("active");
		} else {
			introContainer.classList.remove("active");
		}
	}
}

//---------------------------------------
//Проверяем высоту карточек service

const autoExpandStates = new Map();

function checkService() {
	const THRESHOLD = 200;

	services.forEach((s) => {
		const rect = s.getBoundingClientRect();
		const isVisible = rect.top + THRESHOLD <= window.innerHeight;
		const isAutoExpandEnabled = autoExpandStates.get(s) || false;

		const className = getServiceAddedClassName();

		if (isVisible) {
			if (isAutoExpandEnabled) {
				s.classList.remove(className);
				autoExpandStates.set(s, false);
			}
		} else {
			s.classList.add(className);
			autoExpandStates.set(s, true);
		}
	});
}

