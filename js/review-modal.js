document.addEventListener('DOMContentLoaded', () => {
const reviewModal = document.getElementById('review-modal');
    // const openModalButton = document.getElementById('open-modal');
    // const closeModalButton = document.querySelector('#modal-review__close-btn');
    const loader = document.getElementById('loader');

    // openModalButton.addEventListener('click', () => {
    //     console.log("message")
    //     modal.style.display = 'block';
    // });

    // closeModalButton.addEventListener('click', () => {
    //     modal.style.display = 'none';
    // });

    // window.addEventListener('click', (event) => {
    //     if (event.target == modal) {
    //         modal.style.display = 'none';
    //     }
    // });

    // Отправка формы
    document.getElementById('review-form').addEventListener('submit', (event) => {
        event.preventDefault();

        loader.style.display = 'block'; // Показываем индикатор загрузки

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        fetch('../php/modal-review.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // reviewModal.closeModal();
            alert('Ваш отзыв успешно отправлен!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке отзыва.');
        })
        .finally(() => {
            // loader.style.display = 'none'; // Скрываем индикатор загрузки
        });
    });
});

//подсвечиваем элемент который не заполнен или с ошибкой
function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
}
//перестаем подсвечивать элемент с ошибкой
function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
}