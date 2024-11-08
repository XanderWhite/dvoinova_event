<?php
$directory = './images/gallery';
$images = glob($directory . "/*.{jpg,jpeg,png,gif,webp,JPG}", GLOB_BRACE);

usort($images, function($a, $b) {
    return filemtime($b) - filemtime($a); // Сравнение по времени модификации в обратном порядке
});

// usort($images, function($a, $b) {
//     return filemtime($a) - filemtime($b); // Сравнение по времени модификации в прямом порядке
// });

echo json_encode($images);
?>