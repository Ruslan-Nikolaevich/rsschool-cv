const videoWrapper = document.querySelector('.wrapper');
const video = document.querySelector('.player__video');
const playButton = document.querySelector ('.video-button-play');
const stopButton = document.querySelector ('.video-button-play');// нужна кнопка
const progres = document.getElementById('paly1-id');
const time = document.querySelector('.control-time ');
const btnBack = document.querySelector('.video-button-back'); 
const btnForward = document.querySelector('.video-button-forward'); 
const soundBtnOnOf = document.querySelector('.video-button-volume');
const soundProgresBar = document.getElementById('volume');
const screen = document.getElementById('screen');
let temp;
function playPause() {
    if (video.paused) {
        video.play();
        // playButton.src = 'img/pause.png';
    } else {
        video.pause();
    }
}

playButton.addEventListener('click',playPause)
video.addEventListener('click', playPause);

//Timer
function updateProgres () {
    progres.value = (video.currentTime / video.duration)*100;

    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0'+ String(minutes);
    }
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0'+ String(seconds);
    }
    time.innerHTML = `${minutes}:${seconds}`; 

}
video.addEventListener('timeupdate', updateProgres);

//progresbar video

function setProgres() {
    video.currentTime = (progres.value * video.duration)/100

}
progres.addEventListener('change', setProgres);

//перемотка вперед и назад
function back() {
    video.currentTime = (progres.value * video.duration)/100 - 5;
}
btnBack.addEventListener('click',back)

function forward() {
    video.currentTime = (progres.value * video.duration)/100 + 5;
}
btnForward.addEventListener('click',forward)

// звук
function soundOnOf() {
    if (video.volume === 1) {
        video.volume = 0;
    } else video.volume = 1;
}
soundBtnOnOf.addEventListener('click',soundOnOf);

function volumeData() {
    let v = this.value;
    console.log(v);
    video.volume = v/100;

}
soundProgresBar.addEventListener('change', volumeData);

// видео полный экран
function fullScreenOnOff() {
    if (!document.fullscreenElement) { // document.fullscreenElement возвращает null
        videoWrapper.requestFullscreen();
    } else if (document.fullscreenEnabled) {
        document.exitFullscreen();
    }
    
    
}
screen.addEventListener('click',fullScreenOnOff);

// горячие клавишы
document.onkeydown = function (params) {
    console.log(params);
    if (params.code === 'KeyM') {
        console.log('нажата клавиша m');
        soundOnOf();
    }
    if (params.code === 'Space') {
        // console.log('нажата клавиша Space');
        video.addEventListener('click', playPause);
    }
    if (params.code === 'Period') {
        // console.log('нажата клавиша Space');
        forward();
    }

    if (params.code === 'Comma') {
        // console.log('нажата клавиша Space');
        back();
    }
    if (params.code === 'KeyF') {
        // console.log('нажата клавиша Space');
        fullScreenOnOff();
    }
    
}


