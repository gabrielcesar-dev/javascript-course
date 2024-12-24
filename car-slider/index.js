const slides = document.querySelectorAll('img');
const buttons = document.querySelectorAll('button');

let idInterval = null;
let idTimeout = null;
let index = 0;

document.addEventListener('DOMContentLoaded', () => {
    loopSlider();
});

function loopSlider() {
    idInterval = setInterval(() => {
        index++;
        sliderEvent();
    }, 2500);
}

function sliderEvent() {
    if(index < 0) index = slides.length - 1;
    else if(index >= slides.length) index = 0;

    slides.forEach(slide => {
        slide.classList.add('hidden');
    });

    slides[index].classList.remove('hidden');
}

buttons.forEach(button => {
    button.addEventListener('click', event => {
        clearInterval(idInterval);
        clearTimeout(idTimeout);

        if(event.target.classList.contains('previous')) index--;
        else index++;

        sliderEvent();

        idTimeout = setTimeout(loopSlider, 5000);
    });
});

