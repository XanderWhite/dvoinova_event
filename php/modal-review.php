<?php
header('Content-Type: application/json');

// Проверяем, что данные формы отправлены
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $title = $_POST['event'] ?? '';
    $author = $_POST['author'] ?? '';
    $text = $_POST['review'] ?? '';
    $image = $_FILES['image'] ?? null;

    // Проверяем, что обязательные поля заполнены
    if (empty($title) || empty($author) || empty($text)) {
        echo json_encode(['error' => 'Неверные данные']);
        exit;
    }

    // Настройки для отправки почты
    $to = 'xander.belov23@yandex.ru';
    $subject = 'Новый отзыв: ' . $title;
    $message = "Название события: $title\n";
    $message .= "Автор: $author\n";
    $message .= "Отзыв: $text\n";

    // Заголовки
    $headers = 'From: xander.belov23@yandex.ru' . "\r\n" .
               'Reply-To: xander.belov23@yandex.ru' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Если файл загружен, прикрепляем его к письму
    if ($image && $image['error'] === UPLOAD_ERR_OK) {
        $filePath = $image['tmp_name'];
        $fileName = $image['name'];
        $fileType = $image['type'];

        // Читаем файл
        $fileContent = file_get_contents($filePath);
        $fileContent = chunk_split(base64_encode($fileContent));

        // Уникальный разделитель
        $boundary = md5(time());

        // Заголовки для письма с вложением
        $headers .= "\r\nMIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Тело письма с вложением
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $body .= $message . "\r\n\r\n";
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= $fileContent . "\r\n\r\n";
        $body .= "--$boundary--\r\n";
    } else {
        $body = $message;
    }

    // Отправляем email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['message' => 'Отзыв успешно отправлен']);
    } else {
        echo json_encode(['error' => 'Не удалось отправить отзыв']);
    }
} else {
    echo json_encode(['error' => 'Неверные данные']);
}
?>