let things = [];
var colorPalette = ["#000000", "#fffdf5", "#6b0b0b", "#4b4b4b"];

var colorPaletteStrobe = ["#000000", "#c60010", "#6b0b0b", "#820617"];

var neutralColors = ["#250307","#000000"];

let img;

let mic;

let framerateval = 30;

let currentBeatframe;

let bpmValue = 130;

function preload() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
}



function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(framerateval);
}

function draw() {
    fft.analyze();
    currentBeatframe = bpmtorate(bpmValue);

    animationManager(true,false);
}

function animationManager(onBeat, offBeat) {
    if(onBeat === true){

        if (frameCount%currentBeatframe === 0){
            rectangles();
        }
    }
    if(offBeat === true){
        if (frameCount%currentBeatframe === 0){

        }
    }

}

function colourStrobe() {
    let colourToStrobe = color(colorPaletteStrobe[getRndInteger(0,3)]);
    fill(colourToStrobe);
    rect(-windowWidth, -windowHeight, windowWidth*2, windowHeight*2);
}


function rectangles() {
    let colourToStrobe = color(colorPaletteStrobe[getRndInteger(0,3)]);
    let colourNeutral = color(neutralColors[getRndInteger(0,1)]);

    fill(colourToStrobe);
    rect(0, 0, windowWidth/3, windowHeight);
    rect(windowWidth-windowWidth/3, 0, windowWidth/3, windowHeight);

    fill(colourNeutral);
    rect(windowWidth/3,0,windowWidth/3,windowHeight);
}


function canvasReset() {
    background(colorPalette[0]);

}

function canvasResetRate(rate) {
    if(frameCount%rate === 0){
        background(colorPalette[0]);
    }
}


function bpmtorate(bpm){
    return Math.round(framerateval/ (bpm/60));
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function touchStarted() {
    getAudioContext().resume();
}