//==========================================================================
//services

const service = document.querySelectorAll(".service");

// Изменяем высоту передней части карточки service, если она ниже, чем ее задняя часть
function changeServiceFrontHeight() {
	service.forEach((item) => {
		const serviceFront = item.querySelector(".service__front"),
			serviceBack = item.querySelector(".service__back"),
			serviceFrontHeight = serviceFront.offsetHeight,
			serviceBackHeight = serviceBack.offsetHeight;

		if (serviceFrontHeight <= serviceBackHeight) {
			serviceFront.style.height = serviceBackHeight + "px";
		} else {
			serviceFront.style.height = "auto";
		}
	});
}

window.onload = changeServiceFrontHeight;
window.addEventListener("resize", changeServiceFrontHeight);

service.forEach((item) => {
	item.addEventListener("click", (event) => {
		const s = event.currentTarget;

console.log(window.innerWidth);
const width = window.innerWidth

		if (width < 990 && width >= 450) {
			s.classList.toggle("show-back");
		} else {
			s.classList.toggle("rotated");
		}
	});
});
