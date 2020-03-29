let things = [];
var colorPalette = ["#000000", "#fffdf5", "#6b0b0b", "#4b4b4b"];

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

    background(colorPalette[0]);
    fft.analyze();
    //imageWash();
    blink();
    toruspin();
}

function blink() {
    let grey = color(colorPalette[3]);
    fill(grey);

    rect(0, 0, windowWidth/3, windowHeight);
    rect(windowWidth - windowWidth/3, 0, windowWidth/3, windowHeight);

    if (frameCount%30 === 0){
        erase();
        rect(0, 0, windowWidth, windowHeight);
        noErase();
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
    let coords = {x:Math.random()*windowWidth,y:Math.random()*windowHeight};

    if(frameCount%2 === 0){
        things.push(new imageaphex(img,coords.x,coords.y));
    }
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