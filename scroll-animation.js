// Получаем элемент
const elements = document.querySelectorAll(".how__row");
const introContainer = document.querySelector(".intro__content__container");

window.addEventListener("scroll", ()=>{checkHow();
	checkInto();});

window.addEventListener("load",()=>{checkInto();})

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

function checkInto() {
	const rect = introContainer.getBoundingClientRect();

	if (rect.top * 1.1 <= window.innerHeight) {
		introContainer.classList.add("active");
	} else {
		introContainer.classList.remove("active");
	}
}
