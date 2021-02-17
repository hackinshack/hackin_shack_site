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

    top_menu = new Menu(menu_labels,'menu_up',"../");

    add_header_image();
    add_footer_text();
    add_aside_text();
    
    background_color = color(250,200,100,200);
}

function add_header_image() {
    var header_img = createImg('../images/logo_side_4.png','logo');
    header_img.size(360,65);
    header_img.parent('heads-up');
    header_img.mousePressed(function () {console.log('pressed');})
}

function add_aside_text() {
    var twit = createDiv('This Week in the Shack ...<br><br>');
    twit.parent('side1');
    twit.style('font-size: 20px');

    var twit2 = createDiv('We embark upon another week in the Shack. \
    Not just any week; this week, we unveil a new web site.');
    twit2.parent('side1');
    twit2.style('font: 16px Ariel,sans-serif');

    unfade(twit.elt);
}

function add_footer_text() {
    var f = select('#menu_down');
    f.html('Let&#39s make something.',true)
}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);
}

function windowResized() {
    sketch_width = canvasDiv.offsetWidth-2*sketch_border;
    sketch_height = canvasDiv.offsetHeight-2*sketch_border;
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
    back_sketch.resize();
}
