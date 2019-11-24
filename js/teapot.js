let mic;

let teapot;

var colorPalette = ["#a2a1a6", "#000000", "#2483eb", "#f92a1f"];

function preload() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    peakDetect = new p5.PeakDetect();
    teapot = loadModel('models/teapot.obj', true);
}


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}



function draw() {
    background(colorPalette[0]);

    fft.analyze();
    fft.smooth(0.9);
    peakDetect.update(fft);

    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(100, 150);
    var mid = fft.getEnergy("mid");



    // console.log(bass);
    // console.log(treble);
    // console.log(mid);
    let factorMid = 4;

    if (mid < 100)
        midFlip = 2;
    else
        midFlip = 4;

    let speed = 0.01;

    if (bass > 180)
        speed = 0.1;
    else
        speed = 0.01;


        scale(midFlip); // Scaled to make model fit into canvas

        rotateX(frameCount *speed);
        rotateY(frameCount * speed);
        normalMaterial(); // For effect
        model(teapot);

        console.log(mid);
}


function touchStarted() {
    getAudioContext().resume();
}