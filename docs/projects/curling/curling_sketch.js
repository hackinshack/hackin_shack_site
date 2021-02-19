var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var footer_menu;
var aside_text = "Curling Projects"
var rolling_list = ["simulator","desktop","table_top"];
var rolling_titles = ["curling simulator project","desktop curling project","table top curling project"];
var roll_container;

function setup() {
    back_sketch = new p5(background_sketch);
    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');

    roll_container = new Roll_Container(rolling_list,rolling_titles,opening_sketch);

    background_color = Globals.get_green();
    add_menu();
    add_header_image();
    add_aside_text(aside_text);
}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);

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

function opening_sketch() {
    fill(255);
    textSize(20);
    text("Wacky Curling Projects.",100,100);    
}