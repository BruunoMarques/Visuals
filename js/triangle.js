let mic;

var colorPalette = ["#a2a1a6", "#000000", "#2483eb", "#f92a1f"];

function preload() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    peakDetect = new p5.PeakDetect();
    amplitude = new p5.Amplitude();
    amplitude.setInput(mic);
    amplitude.smooth(0.9);
}


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);


}





function draw() {
    background(colorPalette[1]);

    fft.analyze();
    peakDetect.update(fft);
    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(100, 150);
    var mid = fft.getEnergy("mid");

    console.log(bass);
    let midFlip = 8;

    if(mid > 150 ){
        midFlip = 5;
    }
    else
        midFlip = 16;


    var basebump = bass/100+4;

    var rotate = treble /100;
    rotateX(frameCount * 0.1);
    rotateZ(frameCount * 0.005);

    cone(windowWidth/basebump, windowHeight/1.5, midFlip,1);


}


function touchStarted() {
    getAudioContext().resume();
}
