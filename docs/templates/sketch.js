var menu_labels = ["weeks","projects","about"];
var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
var top_menu;
let back_sketch;

function setup() {
    back_sketch = new p5(sketch);
    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');

    top_menu = new Menu(menu_labels,'menu_up');

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
    var twit = createDiv('<i>This Week in the Shack ...<br><br></i>');
    twit.parent('side1');
    twit.style('font-size: 20px');

    var twit2 = createDiv('We embark upon another week in the Shack. \
    Not just any other week; this week, we unveil a new web site.');
    twit2.parent('side1');
    twit2.style('font: 16px Ariel,sans-serif');
}

function windowResized() {
    sketch_width = canvasDiv.offsetWidth-2*sketch_border;
    sketch_height = canvasDiv.offsetHeight-2*sketch_border;
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
    back_sketch.resize();
}
