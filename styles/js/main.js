const btnX = document.querySelector('.btn-x');
const symbolX = document.getElementById('symbolX');

const btnO = document.querySelector('.btn-o');
const symbolO = document.getElementById('symbolO');

const btnAnimate = document.getElementById('btn-color');

btnX.addEventListener('click', (e) =>{
    btnAnimate.classList.remove('transition-btn-rigth');
    btnAnimate.classList.add('transition-btn-left');

    console.log(btnAnimate.classList);

    symbolO.style.color = "var(--gray)";
    symbolX.style.color = "var(--background-black)";
});

btnO.addEventListener('click', (e) => {
    btnAnimate.classList.add('transition-btn-right');
    btnAnimate.classList.remove('transition-btn-left');

    console.log(btnAnimate.classList);

    symbolO.style.color = "var(--background-black)";
    symbolX.style.color = "var(--gray)";
})