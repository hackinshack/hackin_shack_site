var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var list_function;
var footer_menu;
var rolling_list = ["w1_21_02"];

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
    add_aside_text();
    // add_footer_menu(project_cat,"projects");
    footer_menu = add_footer_roll(rolling_list);
    
    background_color = Globals.get_green();
    list_function = opening_sketch;

}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);

    
    list_function();

    if (footer_menu.has_clicked()) footer_menu.update();
    if (footer_menu.item_changed()) {
        var ind = footer_menu.get_index();
        list_function = eval(rolling_list[ind]);
    }
    
}

function add_aside_text() {
    var twit = createDiv('This Week ...');
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

// experimental:
function w1_21_02() {
    fill(255);
    text("Week 1 February 2021",100,100);
}

function desktop_curling() {
    fill(255);
    text("desktop curling project",100,100);
}

function p5_demos() {
    fill(255);
    text("p5 demos",100,100);
}

function opening_sketch() {
    fill(255);
    text("opening sketch",100,100);    
}