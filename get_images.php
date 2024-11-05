<?php
$directory = './images/gallery';
$images = glob($directory . "/*.{jpg,jpeg,png,gif,webp,JPG}", GLOB_BRACE);
echo json_encode($images);
?>