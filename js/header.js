const menu = document.querySelector(".nav"),
	btnMenu = document.querySelector(".btn-menu");

// Header
const WIDTH_TO_SHOW_BURGER = 992;
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		const targetId = this.getAttribute("href");
		const targetElement = document.querySelector(targetId);

		const elementPosition = targetElement.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth", // Плавная прокрутка
		});

		if (window.innerWidth < WIDTH_TO_SHOW_BURGER) {
			menu.classList.toggle("open");
			btnMenu.classList.toggle("active");
		}
	});
});

//btn-menu

btnMenu.addEventListener("click", () => {
	console.log('message')
	menu.classList.toggle("open");
	btnMenu.classList.toggle("active");
});

//hide header
let lastScrollTop = 0;
const header = document.getElementById("header");
const threshold = 100; // Пороговое значение для срабатывания

window.addEventListener("scroll", () => {
	const currentScrollTop =
		window.pageYOffset || document.documentElement.scrollTop;

	if (Math.abs(currentScrollTop - lastScrollTop) >= threshold) {
		if (currentScrollTop > lastScrollTop) {
			// Скролл вверх
			header.classList.add("hidden");
			if (window.innerWidth < WIDTH_TO_SHOW_BURGER) {
				menu.classList.remove("open");
			}
		} else {
			// Скролл вниз
			header.classList.remove("hidden");
		}
		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Для мобильных браузеров
	}
});
