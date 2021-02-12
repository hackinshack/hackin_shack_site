var canv;
let xoff = 0.0;
let yoff = 0.5;

function setup() {
    canv = createCanvas(windowWidth, 3*windowHeight);
    canv.position(0,0);
    canv.style('z-index','-1');
}

function draw() {
    background(100,200,200);
    
    xoff = xoff + 0.01;
    yoff = yoff + 0.01;
    let x = noise(xoff) * width;
    let y = noise(yoff) * height/3;
    ellipse(x,y,100,100);
}

function windowResized() { 
    resizeCanvas(windowWidth, 3*windowHeight); 
} 