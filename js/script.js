const congratulation = document.getElementById('congratulation');
let revTitles = congratulation.querySelectorAll('.review__title');
let revText = congratulation.querySelectorAll('.review__text');

congratulation.addEventListener('click', ()=>{


if(revTitles[0].classList.contains('hide')){
    revTitles[0].classList.remove('hide');
    revTitles[1].classList.add('hide');
    revText[0].classList.remove('hide');
    revText[1].classList.add('hide');

}
else{
    revTitles[1].classList.remove('hide');
    revTitles[0].classList.add('hide');
    revText[1].classList.remove('hide');
    revText[0].classList.add('hide');

    sendEmailNotification();
}

});

function sendEmailNotification() {
    const emailData = {
        to: 'xander.belov23@yandex.ru', // Замените на ваш email
        subject: 'Элемент был нажат',
        message: 'Элемент с id "congratulation" был нажат.'
    };

    fetch('../php/send-email.php', { // Указываем путь к PHP-скрипту
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Ответ от сервера:', data);
    })
    .catch((error) => {
        console.error('Ошибка при отправке уведомления:', error);
    });
}