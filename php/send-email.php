<?php
// Получаем данные из тела запроса
$data = json_decode(file_get_contents('php://input'), true);

// Извлекаем данные
$to = $data['to'];
$subject = $data['subject'];
$message = $data['message'];

// Заголовки для email
$headers = "From: xander.belov23@yandex.ru\r\n"; // Замените на ваш email
$headers .= "Reply-To: xander.belov23@yandex.ru\r\n"; // Замените на ваш email
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Отправка email
if (mail($to, $subject, $message, $headers)) {
    echo "Email успешно отправлен!";
} else {
    http_response_code(500); // Ошибка сервера
    echo "Ошибка при отправке email.";
}
?>