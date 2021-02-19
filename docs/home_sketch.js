var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;

function setup() {
    back_sketch = new p5(background_sketch);
    canvasDiv = document.getElementById('sketch1');

    resize();
    
    add_header_image();
    add_menu();
    add_aside_text();
    add_footer_text();

    background_color = Globals.get_orange();
}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);
}

function add_aside_text() {
    var twit = createDiv('Welcome!');
    twit.parent('side1');
    twit.style('font-size: 24px');
}

function resize() {
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');
}

function windowResized() {
    resize();
    back_sketch.resize();
}
