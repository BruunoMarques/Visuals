let things = [];
var colorPalette = ["#000000", "#fffdf5", "#6b0b0b", "#4b4b4b"];

var colorPaletteStrobe = ["#42060b", "#ff1c13", "#6b0b0b", "#000000"];

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

    img = loadImage('images/aphex-main.jpg');
}



function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(framerateval);
    background(colorPalette[0]);
}

function draw() {
    fft.analyze();
    currentBeatframe = bpmtorate(bpmValue);
    animationManager(true,false);
    noFill();
    rotatingCube(fft.getEnergy("bass"));
}

function animationManager(onBeat, offBeat) {
    if(onBeat === true){

        if (frameCount%currentBeatframe === 0){
            colourStrobe();
            //background(colorPalette[0]);
        }

    }

}

function colourStrobe() {
    let colourToStrobe = color(colorPaletteStrobe[getRndInteger(0,3)]);
    fill(colourToStrobe);

    rect(-2*windowWidth, -2*windowHeight, windowWidth*4, windowHeight*4);
}



function rotatingCube(fftvalue) {

   // background(colorPalette[0]);

    rotateY(PI / 6);
    stroke(153);
    box(windowHeight/2.5 * fftvalue/100);

    let rad = millis() / 1000;
    // Set rotation angles
    let ct = cos(rad);
    let st = sin(rad);
    // Matrix for rotation around the Y axis
    applyMatrix(  ct, 0.0,  st,  0.0,
        0.0, 1.0, 0.0,  0.0,
        -st, 0.0,  ct,  0.0,
        0.0, 0.0, 0.0,  1.0);
    stroke(255);
    box(500);
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

function imageWash(){
    let coords = {x:getRndInteger(-windowWidth,windowWidth),y:getRndInteger(-windowHeight,windowHeight)};
    if(frameCount%1 === 0){
        things.push(new imageaphex(img,coords.x,coords.y));
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


class imageaphex{
    constructor(img, x, y) {
        image(img,x,y);
    }
}

function touchStarted() {
    getAudioContext().resume();
}