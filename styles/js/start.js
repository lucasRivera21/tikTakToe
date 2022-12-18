import {cpu, player} from './main.js'

const btnX = document.querySelector('.btn-x');
const symbolX = document.getElementById('symbolX');

const btnO = document.querySelector('.btn-o');
const symbolO = document.getElementById('symbolO');

const btnAnimate = document.getElementById('btn-color');

var symbol = "o";

btnX.addEventListener('click', (e) =>{
    btnAnimate.classList.remove('transition-btn-right');
    btnAnimate.classList.add('transition-btn-left');

    symbolO.style.color = "var(--gray)";
    symbolX.style.color = "var(--background-black)";

    symbol = "x";
});

btnO.addEventListener('click', (e) => {
    btnAnimate.classList.remove('transition-btn-left')
    btnAnimate.classList.add('transition-btn-right');

    symbolO.style.color = "var(--background-black)";
    symbolX.style.color = "var(--gray)";

    symbol = "o";
});

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (e) => {
    if(e.target && (e.target.tagName === 'P' || e.target.tagName === 'BUTTON')){
        e.target.classList[0] === 'cpu' ? cpu(symbol) : player();
    }
});