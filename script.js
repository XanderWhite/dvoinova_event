const defaultColor = '#9e929e'

let socials = document.querySelectorAll('.social__item');

socials.forEach(item=>{
item.addEventListener('mouseenter', () => {
    const color = item.getAttribute('data-color');
    item.style.borderColor = color;

    let icon = item.querySelector('.fill-color');
    const icons = item.querySelectorAll('.fill-color');
    icons.forEach(icon => icon.style.fill = color);
});

item.addEventListener('mouseleave', () => {
    item.style.borderColor = defaultColor;
    const icons = item.querySelectorAll('.fill-color');
    icons.forEach(icon => icon.style.fill = defaultColor);
});
});


