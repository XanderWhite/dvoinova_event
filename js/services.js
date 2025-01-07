//==========================================================================
//services

const service = document.querySelectorAll(".service");

// Изменяем высоту передней части карточки service, если она ниже, чем ее задняя часть
function checkServiceFrontHeight() {
	service.forEach((item) => {
		const serviceFront = item.querySelector(".service__front"),
			serviceBack = item.querySelector(".service__back"),
			serviceFrontHeight = serviceFront.offsetHeight,
			serviceBackHeight = serviceBack.offsetHeight;

		if (serviceFrontHeight <= serviceBackHeight) {
			serviceFront.style.height = `${serviceBackHeight}px`;
		} else if (serviceFront.style.height !== "auto") {
			serviceFront.style.height = "auto";
		}
	});
}

window.onload = checkServiceFrontHeight;
window.addEventListener("resize", checkServiceFrontHeight);

service.forEach((item) => {
	item.addEventListener("click", (event) => {
		const s = event.currentTarget;

		s.classList.toggle(getServiceAddedClassName());
	});
});

function getServiceAddedClassName() {
	const width = Math.floor(window.innerWidth);
	return width < 990 && width >= 450 ? "show-back" : "rotate";
}
