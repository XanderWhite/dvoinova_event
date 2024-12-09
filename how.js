  // Получаем элемент
  const elements = document.querySelectorAll('.how__row');

  function checkScroll() {
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const items = element.querySelectorAll('.how__item');

                items[0].classList.add('left');
                items[1].classList.add('right');

                if (rect.top  <= window.innerHeight) {

                    items[0].classList.add('active');
                    items[1].classList.add('active');
                } else {
                    items[0].classList.remove('active');
                    items[1].classList.remove('active');
                }

            });
        }

  window.addEventListener('scroll', checkScroll);