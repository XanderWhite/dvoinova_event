const WIDTH_TO_SHOW_BURGER = 992;

const page = document.querySelector(".page__inner");
const header = document.querySelector(".header"),
	menu = document.querySelector(".nav"),
	menuBtn = document.querySelector(".btn-menu");

let isScrollingProgrammatically = false; // Флаг для отслеживания программной прокрутки

//--------------------------------
//плавный скрол при нажатии на кнопки меню

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		const targetId = this.getAttribute("href");
		const targetElement = document.querySelector(targetId);

		const elementPosition = targetElement.getBoundingClientRect().top;
		const headerHeight = header.offsetHeight;
		const offsetPosition = elementPosition + window.scrollY - headerHeight;

		isScrollingProgrammatically = true; // Устанавливаем флаг перед прокруткой

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		});

		setTimeout(() => {
			isScrollingProgrammatically = false; // Сбрасываем флаг после завершения скролла
		}, 1000);

		closeActiveMenu();
	});
});

//--------------------------------
//плавный скрол при нажатии на кнопки меню. Этот вариант для работы с доменом

// document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//         // Проверяем, содержит ли ссылка хэш (например, #about)
//         if (this.getAttribute("href").includes("#")) {
//             // Извлекаем URL и хэш из атрибута href
//             const url = this.getAttribute("href").split("#")[0];
//             const targetId = this.getAttribute("href").split("#")[1];

//             // Проверяем, находится ли ссылка на текущей странице
//             if (url === window.location.href.split("#")[0]) {
//                 e.preventDefault();

//                 const targetElement = document.querySelector(`#${targetId}`);

//                 if (targetElement) {
//                     // Вычисляем позицию элемента с учетом высоты шапки
//                     const elementPosition = targetElement.getBoundingClientRect().top;
//                     const headerHeight = header.offsetHeight;
//                     const offsetPosition = elementPosition + window.scrollY - headerHeight;

// isScrollingProgrammatically = true; // Устанавливаем флаг перед прокруткой
//                     // Плавный скролл к элементу
//                     window.scrollTo({
//                         top: offsetPosition,
//                         behavior: "smooth",
//                     });

//                     setTimeout(() => {
//                         isScrollingProgrammatically = false; // Сбрасываем флаг после завершения скролла
//   }, 1000);

//                      closeActiveMenu();
//                 }
//             }
//         }
//     });
// });

//------------------------------
//нажатие на btn-menu

menuBtn.addEventListener("click", () => {
	if (menuBtn.classList.contains("active")) {
		closeActiveMenu();
	} else {
		menu.classList.add("open");
		menuBtn.classList.add("active");
		menu.style.opacity = 1;
		menu.style.translate = `0 ${header.offsetHeight}px`;
	}
});

//----------------------------
//скрытие header при прокрутке

let lastScrollTop = 0;
const threshold = 100; // Пороговое значение для срабатывания

window.addEventListener("scroll", () => {
	if (isScrollingProgrammatically) return;

	const currentScrollTop =
		window.pageYOffset || document.documentElement.scrollTop;

	if (Math.abs(currentScrollTop - lastScrollTop) >= threshold) {
		if (currentScrollTop > lastScrollTop) {
			// Скролл вниз
			header.classList.add("hidden");
			closeActiveMenu();
		} else {
			// Скролл вверх
			header.classList.remove("hidden");
		}
		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Для мобильных браузеров
	}
});

function closeActiveMenu() {
	menuBtn.classList.remove("active");
	menu.classList.remove("open");
	menu.style.translate = ``;
}

window.addEventListener("resize", closeActiveMenu);

//-----------------------
//title для menu__link

const links = document.querySelectorAll(".menu__link");

links.forEach((link) => {
	link.addEventListener("mouseenter", () => {
		link.setAttribute("title", link.textContent);
	});
});

//-----------------------
// высота margin-top для page__inner в зависимости от высоты header

const resizeObserver = new ResizeObserver((entries) => {
	const height = entries[0].contentRect.height;

	page.style.marginTop = `${height}px`;

	document.documentElement.style.setProperty(
		"--element-height",
		`calc(100vh - ${height}px)`
	);
});

resizeObserver.observe(header);
