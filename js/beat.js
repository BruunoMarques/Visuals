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
    console.log(wave);


    beginShape();
    for (i = 0; i < spectrum.length; i++) {
            vertex(i*(windowWidth/spectrum.length), map(spectrum[i]+wave, 0, 255, height, 100));
    }
    endShape();

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i*(windowWidth/spectrum.length), map(spectrum[i]+wave, 0, 255, height/2, 100));
    }
    endShape();

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i*(windowWidth/spectrum.length), map(spectrum[i]+wave, 0, 255, height/3, 100));
    }
    endShape();

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i*(windowWidth/spectrum.length), map(spectrum[i]+wave, 0, 255, height/4, 100));
    }
    endShape();

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i*(windowWidth/spectrum.length), map(spectrum[i]+wave, 0, 255, height/5, 100));
    }
    endShape();

    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(i*(windowWidth/spectrum.length), map(spectrum[i]+wave, 0, 255, height/6, 100));
    }
    endShape();
}

function touchStarted() {
    getAudioContext().resume();
}