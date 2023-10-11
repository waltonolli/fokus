const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const figura = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseButton = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarPausarButton = document.querySelector('#start-pause span');
const playButton = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');


let tempoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoButton.addEventListener('click', () => {
    tempoEmSegundos = 1500;
    alterarContexto('foco');
    focoButton.classList.add('active');
})

curtoButton.addEventListener('click', () => {
    tempoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoButton.classList.add('active');
})

longoButton.addEventListener('click', () => {
    tempoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoButton.classList.add('active');
})

function alterarContexto (contexto) {
    mostrarTempo();
    buttons.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    figura.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = 
                `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = 
                `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
                titulo.innerHTML = 
                    `Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado');
        zerar();
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo();
    console.log('Id: ' + intervaloId);
}

startPauseButton.addEventListener('click', iniciarOuPausarContagem);

function iniciarOuPausarContagem() {
    if(intervaloId){
        audioPause.play();
        playButton.setAttribute('src', '/imagens/play_arrow.png')
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarPausarButton.textContent = "Pausar";
    playButton.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId);
    iniciarPausarButton.textContent = "Começar"
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()