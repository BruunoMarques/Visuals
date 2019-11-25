let things = [];
let colorPalette = ["#930009", "#270703", "#5e5d61", "#ff1900"];


let mic;

function preload() {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {
    background(0);

    fft.analyze();



    //things.push(new Circle(createVector(width/2, height/2)));
   // things.push(new Triangle(createVector(width/2, height/2)));


    let val = random(1,4);
    let bassAcc = fft.getEnergy("bass");
    console.log(bassAcc);


    things.push(new Rectangle(createVector(width/val, height/val)));
    for (let i = 0; i < things.length; i ++) {
        let t = things[i];
        t.update(0.2);
        if (bassAcc> 80){

            t.display();
        }

    }

    if (things.length > 500) {
        things.splice(0, 100);
    }
}


class Thing {
    constructor(pos) {
        this.pos = pos;
        this.vel = createVector();
        this.acc = createVector(random(-1, 1), random(-1, 1));
    }


    update(bassAcc) {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(bassAcc);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, 10, 10);
        pop();
    }
}

class Circle extends Thing {
    constructor(pos) {
        super(pos);
        this.size = random(10, 30);
        this.clr = color(random(50, 255), 100, 150);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(this.clr);
        ellipse(0, 0, this.size, this.size);
        pop();
    }
}

class Triangle extends Thing {
    constructor(pos) {
        super(pos);
        this.scl = random(1, 1.5);
        this.clr = color(255, random(50, 255), 255);
        this.angle = 0;
        this.rad = random(-0.02, 0.02)
    }

    spin() {
        this.angle += this.rad;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        scale(this.scl);
        rotate(this.angle);
        noStroke();
        fill(this.clr);
        triangle(10, 0, -5, -10, -5, 10);
        pop();
    }
}

class Rectangle extends Thing {
    constructor(pos) {
        super(pos);
        this.w = random(1, 3);
        this.h = random(1, 3);
        this.clr = colorPalette[floor(random(0,4))];
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(this.clr);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}


function touchStarted() {
    getAudioContext().resume();
}
