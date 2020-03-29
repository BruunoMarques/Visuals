let things = [];
var colorPalette = ["#000000", "#fffdf5", "#6b0b0b", "#4b4b4b"];

var colorPaletteStrobe = ["#42060b", "#ff1c13", "#6b0b0b", "#ffffff"];

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
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    frameRate(30);
    fft.analyze();
    canvasReset(1);
    if(fft.getEnergy("bass") > 100){
        //colourStrobe();
    }
    imageWash();
    //toruspin();
}


function colourStrobe() {
    let colourToStrobe = color(colorPalette[getRndInteger(0,3)]);
    fill(colourToStrobe);

    rect(-windowWidth, -windowHeight, windowWidth*2, windowHeight*2);
}


function canvasReset(rate) {

    if(frameCount%rate === 0){
        background(colorPalette[0]);
    }
}

function toruspin() {
    fill(colorPalette[2]);
    noStroke();
    sphere(windowHeight/5);
    erase();
    rotateY(frameCount * 0.2);
    translate(0, 0, 40);
    torus(windowHeight/4, 15,3,12);
    noErase();
}

function imageWash(){
    let coords = {x:getRndInteger(-windowWidth,windowWidth),y:getRndInteger(-windowHeight,windowHeight)};
    if(frameCount%2 === 0){
        things.push(new imageaphex(img,coords.x,coords.y));
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class imageaphex{
    constructor(img, x, y) {
        image(img,x,y);
    }
}

function touchStarted() {
    getAudioContext().resume();
}