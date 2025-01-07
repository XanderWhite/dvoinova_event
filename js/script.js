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



}

});

