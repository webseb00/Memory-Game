import '../scss/style.scss';

const boardCard = document.querySelector('.board__cards');

const iconsArr = ['42-radar.svg', '47-rocket.svg', '45-astronaut.svg', '38-lander.svg', '26-sputnik.svg', '18-star.svg',
                '42-radar.svg', '47-rocket.svg', '45-astronaut.svg', '38-lander.svg', '26-sputnik.svg', '18-star.svg',
                '42-radar.svg', '47-rocket.svg', '45-astronaut.svg', '38-lander.svg', '26-sputnik.svg', '18-star.svg',
                '42-radar.svg', '47-rocket.svg'];
let element;

iconsArr.forEach(el => {
    element = `<div class="board__card">
            <div class="board__card-side board__card--front">
            </div>
            <div class="board__card-side board__card--back">
                <img class="board__icon" src="../icons/SVG/EXPANDED/${el}" onload="SVGInject(this)" />
            </div>
        </div>`;    

        boardCard.insertAdjacentHTML('beforeend', element);
});