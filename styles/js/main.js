function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function cpu(){
    console.log("INTERFAZ CPU");
    const symbol = localStorage.getItem("selected");
    enableCssPlay();
}

function player(){
    console.log("INTERFAZ PLAYER")
    const symbol = localStorage.getItem("selected");
    enableCssPlay();
}

async function enableCssPlay(){
    document.querySelector('.symbol-and-select').classList.add('transition-up');
    document.querySelector('.vs-cpu').classList.add('transition-right');
    document.querySelector('.vs-player').classList.add('transition-left');
    await delay(470);
    document.querySelector('.start').classList.add('enable');
    document.querySelector('.play').classList.remove('enable');
}

export {cpu, player};
