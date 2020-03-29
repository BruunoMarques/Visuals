let mic;

var colorPalette = ["#a2a1a6", "#000000", "#2483eb", "#f92a1f"];

var ellipseWidth = 10;


function preload() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

}


function setup() {
    createCanvas(windowWidth, windowHeight);
}


function draw() {
    noFill();
    background(colorPalette[0]);
    let spectrum = fft.analyze();

    let wave = fft.getEnergy("bass");



}

function touchStarted() {
    getAudioContext().resume();
}