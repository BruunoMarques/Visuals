let pieces, radius, fft, mapMouseX, mapMouseY, audio, toggleBtn;
var colorPalette = ["#000000", "#fffdf5", "#e2dfeb", "#4b4b4b"];

let img;

let mic;

function preload() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    img = loadImage('images/aphex-main.jpg');
}



function setup() {
    createCanvas(windowWidth, windowHeight);

    image(img, 50, 0);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function touchStarted() {
    getAudioContext().resume();
}