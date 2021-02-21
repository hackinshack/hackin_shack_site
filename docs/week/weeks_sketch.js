var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var list_function;
var footer_menu;

var main_title = "This Week ...";
var aside_text = "This Week";
var rolling_list = ["opening","w1_21_02"];
var rolling_titles = ["","Week 1, Feb 2021"];
var roll_container;

function setup() {
    back_sketch = new p5(background_sketch);
    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');

    roll_container = new Roll_Container(rolling_list,rolling_titles);

    background_color = Globals.get_pink();
    add_menu();
    add_header_image();
    add_aside_text(aside_text);
}

function draw() {
    clear();
    background(background_color);

    roll_container.update(); 
}

function add_aside_text(txt_string) {
    var twit = createDiv(txt_string);
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

function touchStarted() {
    roll_container.mseClicked();
}

function mouseClicked() {
    roll_container.mseClicked();
}

function opening() {
    fill(255);
    textSize(30);
    textAlign(CENTER,CENTER);
    text(main_title,width/2,100);    
}