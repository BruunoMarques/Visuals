let things = [];
var colorPalette = ["#000000", "#fffdf5", "#6b0b0b", "#4b4b4b"];

var colorPaletteStrobe = ["#42060b", "#ff1c13", "#6b0b0b", "#ffffff"];

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
}

function draw() {
    fft.analyze();
    currentBeatframe = bpmtorate(bpmValue);
    animationManager(true,false);
}

function animationManager(onBeat, offBeat) {
    if(onBeat === true){

        if (frameCount%currentBeatframe === 0){
            console.log(currentBeatframe);
            //colourStrobe();
            rectangles();
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
    fill(colourToStrobe);
    rect(0, -windowHeight, windowWidth/3, 2*windowHeight);
    rect(-windowWidth/2, -windowHeight, windowWidth/3, 2*windowHeight);
    //rect(-windowWidth, -windowHeight, windowWidth*2, windowHeight*2);
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