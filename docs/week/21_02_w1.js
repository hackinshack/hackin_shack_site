var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;

function setup() {
    back_sketch = new p5(background_sketch);
    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');

    add_menu();
    add_header_image();
    add_footer_text();
    add_aside_text();
    
    background_color = color(250,200,100,200);
}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);
}

function add_aside_text() {
    var twit = createDiv('This Week');
    twit.parent('side1');
    twit.style('font-size: 24px');
}

function windowResized() {
    sketch_width = canvasDiv.offsetWidth-2*sketch_border;
    sketch_height = canvasDiv.offsetHeight-2*sketch_border;
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
    back_sketch.resize();
}
