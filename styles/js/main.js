var turn = false;
var roundCount = 0;
const vector = [[null, null, null], [null, null, null], [null, null, null]];
var enableO = false;
var enableX = false;

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function cpu(symbol){
    console.log("INTERFAZ CPU");
    enableCssPlay();
}

function player(){
    console.log(turn);
    console.log(roundCount);
    enableCssPlay();
    document.querySelector('.player-1').textContent = '(P1)';
    document.querySelector('.player-2').textContent = '(P2)';
    game();
}

async function enableCssPlay(){
    document.querySelector('.symbol-and-select').classList.add('transition-up');
    document.querySelector('.vs-cpu').classList.add('transition-right');
    document.querySelector('.vs-player').classList.add('transition-left');
    await delay(470);
    document.querySelector('.top').classList.add('animation-top');
    document.querySelector('.middle').classList.add('animation-middle');
    document.querySelector('.bot').classList.add('animation-bot');

    document.querySelector('.start').classList.add('enable');
    document.querySelector('.play').classList.remove('enable');
}

function game(){
    const middle = document.querySelector('.middle');
    const turnX = document.querySelector('.turn-x');
    const turnO = document.querySelector('.turn-o');

    middle.addEventListener('click', (e) => {
        console.log(e.target);
        if(e.target.tagName === 'BUTTON'){
            if(roundCount < 9){
                if(turn){
                    turnX.classList.remove('enable');
                    turnO.classList.add('enable');
                }else{
                    turnX.classList.add('enable');
                    turnO.classList.remove('enable');
                }
            }
            roundCount++;
            switch(e.target.classList[0]){
                case 'btn-1':
                    addVector(0,0);
                    writeXO('1');
                    break;
                case 'btn-2':
                    addVector(0,1);
                    writeXO('2');
                    break;
                case 'btn-3':
                    addVector(0,2);
                    writeXO('3');
                    break;
                case 'btn-4':
                    addVector(1,0);
                    writeXO('4');
                    break;
                case 'btn-5':
                    addVector(1,1);
                    writeXO('5');
                    break;
                case 'btn-6':
                    addVector(1,2);
                    writeXO('6');
                    break;
                case 'btn-7':
                    addVector(2,0);
                    writeXO('7');
                    break;
                case 'btn-8':
                    addVector(2,1);
                    writeXO('8');
                    break;
                case 'btn-9':
                    addVector(2,2);
                    writeXO('9');
                    break;
                default:
                    console.log('Unknow');
            }
            win();
        }
    })
}

function writeXO(num){
    enableO = document.querySelector('.o-'+num).classList.value.includes('enable');
    enableX = document.querySelector('.o-'+num).classList.value.includes('enable');
    if(enableX && enableO){
        if(turn){
            document.querySelector('.o-'+num).classList.remove('enable');
            turn = false;
        }else{
            document.querySelector('.x-'+num).classList.remove('enable');
            turn = true;
        }
    }
}

function addVector(n,m){
    if(!vector[n][m]){
        turn ? vector[n][m] = 'o' : vector[n][m] = 'x';
    };
}

var winner = false;
function win(){
    if(turn){
        for(let i=0; i<3; i++){
            //WIN HORIZONTAL
            winner = vector[i].every(value => value === 'x');
            if(winner){
                i ? i == 1 ? winnerAnimation('4', '5', '6', 'blue', 'x') : winnerAnimation('7', '8', '9', 'blue', 'x') : winnerAnimation('1', '2', '3', 'blue', 'x');
            }
            
            //WIN VERTICAL
            if(vector[0][i] === 'x' && vector[1][i] === 'x' &&vector[2][i] === 'x'){
                i ? i == 1 ? winnerAnimation('2', '5', '8', 'blue', 'x') : winnerAnimation('3', '6', '9', 'blue', 'x') : winnerAnimation('1', '4', '7', 'blue', 'x');
            }
        }

        //WIN DIAGONAL
        if(vector[0][0] === 'x' && vector[1][1] === 'x' && vector[2][2] === 'x'){
            winnerAnimation('1', '5', '9', 'blue', 'x');
        }

        //WIN DIAGONAL REVERSE
        if(vector[2][0] === 'x' && vector[1][1] ==='x' && vector[0][2] === 'x'){
            winnerAnimation('7', '5', '3', 'blue', 'x');
        } 
    }else{
        for(let i=0; i<3; i++){

            //WIN HORIZONTAL
            winner = vector[i].every(value => value === 'o');  
            if(winner){
                i ? i == 1 ? winnerAnimation('4', '5', '6', 'orange', 'o') : winnerAnimation('7', '8', '9', 'orange', 'o') : winnerAnimation('1', '2', '3', 'orange', 'o');
            }  

            //WIN VERTICAL
            if(vector[0][i] === 'o' && vector[1][i] === 'o' &&vector[2][i] === 'o'){
                i ? i == 1 ? winnerAnimation('2', '5', '8', 'orange', 'o') : winnerAnimation('3', '6', '9', 'orange', 'o') : winnerAnimation('1', '4', '7', 'orange', 'o');
            }
        }

        //WIN DIAGONAL
        if(vector[0][0] === 'o' && vector[1][1] === 'o' && vector[2][2] === 'o'){
            winnerAnimation('1', '5', '9', 'orange', 'o');
        }

        //WIN DIAGONAL INVERSE
        if(vector[2][0] === 'o' && vector[1][1] ==='o' && vector[0][2] === 'o'){
            winnerAnimation('7', '5', '3', 'orange', 'o');
        }
    }   
}

async function winnerAnimation(num1, num2, num3, color, symbol){
    if (turn){
        document.querySelector('.x-winner').classList.remove('enable');
        document.querySelector('.o-winner').classList.add('enable');
        document.querySelector('.take').style.color = 'var(--blue)';
        document.querySelector('.name-winner').textContent = 'PLAYER 1 WIN';
    }else{
        document.querySelector('.x-winner').classList.add('enable');
        document.querySelector('.o-winner').classList.remove('enable');
        document.querySelector('.take').style.color = 'var(--orange)';
        document.querySelector('.name-winner').textContent = 'PLAYER 2 WIN';
    }
    document.querySelector('.dont-click').classList.remove('enable');
    document.querySelector('.'+symbol+'-'+num1).classList.add('winner-animation');
    document.querySelector('.btn-'+num1).style.backgroundColor = `var(--${color})`;
    await delay(200);
    document.querySelector('.'+symbol+'-'+num2).classList.add('winner-animation');
    document.querySelector('.btn-'+num2).style.backgroundColor = `var(--${color})`;
    await delay(200);
    document.querySelector('.'+symbol+'-'+num3).classList.add('winner-animation');
    document.querySelector('.btn-'+num3).style.backgroundColor = `var(--${color})`;
    await delay(1300);
    document.querySelector('.dont-click').style.backgroundColor = 'var(--background-black)';
    document.querySelector('.winner-container').classList.remove('enable');
}

//BTN QUIT
document.querySelector('.quit').addEventListener('click', () =>{
    clear();
    //QUITAR WINNER-ANIMATION
    document.querySelector('.play').classList.add('enable');
    document.querySelector('.dont-click').classList.add('enable');
    document.querySelector('.winner-container').classList.add('enable');
    document.querySelector('.start').classList.remove('enable');
    document.querySelector('.symbol-and-select').classList.remove('transition-up');
    document.querySelector('.vs-cpu').classList.remove('transition-right');
    document.querySelector('.vs-player').classList.remove('transition-left');
})

//BTN NEXT
document.querySelector('.next').addEventListener('click', () =>{
    console.log('NEXT');
})

//CLEAR
const symbols = document.querySelectorAll('.symbol-mid');
const boxes = document.querySelectorAll('.btn-box');
function clear(){
    for(let i=0; i<symbols.length; i++){
        if(i<3){
            vector[0][i] = null;
            vector[1][i] = null;
            vector[2][i] = null;
        }
        symbols[i].classList.add('enable');
        if(i<9){
            boxes[i].style.backgroundColor = 'var(--black)';
        }
    }



    turn = false;
    roundCount = 0;
    winner = false;
}
export {cpu, player};
