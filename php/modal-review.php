<?php
header('Content-Type: application/json');

// Получаем данные из JSON
$data = json_decode(file_get_contents("php://input"), true);

// Проверяем, что данные присутствуют
if(isset($data['title']) && isset($data['author']) && isset($data['text'])) {
    $title = $data['title'];
    $author = $data['author'];
    $text = $data['text'];

    // Настройки для отправки почты
    $to = 'xander.belov23@yandex.ru';
    $subject = 'Новый отзыв: ' . $title;
    $message = "Название события: $title\n";
    $message .= "Автор: $author\n";
    $message .= "Отзыв: $text\n";

    // Заголовки
    $headers = 'From: xander.belov23@yandex.ru' . "\r\n" . // Замените на ваш адрес
               'Reply-To: xander.belov23@yandex.ru' . "\r\n" . // Замените на ваш адрес
               'X-Mailer: PHP/' . phpversion();

    // Отправляем email
    if(mail($to, $subject, $message, $headers)) {
        echo json_encode(['message' => 'Отзыв успешно отправлен']);
    } else {
        echo json_encode(['error' => 'Не удалось отправить отзыв']);
    }
} else {
    echo json_encode(['error' => 'Неверные данные']);
}
?>