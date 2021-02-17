var menu_buttons = [];
var menu_labels = ["projects","about"];
var canv;
var background_color;
var canvasDiv;
var container;
var standard_height = 450;
var sketch_width, sketch_height;
var sketch_border = 10;
var header_img;
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

    // create_menu_up();
    add_header_image();
    add_footer_image();
    add_aside_text();
    
    background_color = color(250,200,100,200);

    // let aside = select('#side1');
    // let fq = aside.html('This week in the Shack: <br>\
    // we embark upon our new adventure.',true);
    // fq.style('transform','rotate(-30deg)');
    // let t2 = select('#side1');
    // t2.html(' Please leave this unrotated.');

}

function add_aside_text() {
    var twit = createDiv('<i>This Week in the Shack ...<br><br></i>');
    twit.parent('side1');
    twit.style('font-size: 20px');
    // twit.style('transform: rotate(-30deg)');

    var twit2 = createDiv('We embark upon another week in the Shack. \
    Not just any other week; this week, we unveil a new web site.');
    twit2.parent('side1');
    twit2.style('font: 16px Ariel,sans-serif');

    // twit.style('font-family: Lucida Handwriting');
    // twit.style('font-family','Papyrus');
}

function add_header_image() {
    var header_img = createImg('./images/logo_side_4.png','logo');
    header_img.size(360,65);
    header_img.parent('heads-up');
    header_img.mousePressed(function () {console.log('pressed');})
}

function add_footer_image() {
    // var footer_img = createImg('./images/motto_black.png','make something.');
    // footer_img.parent('menu_down');
    // footer_img.size(225,25);

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
