
var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var project_function;
var footer_menu;
var project_list = ["curling_simulator","desktop_curling","p5_demos"];
var project_cat = ["curling","p5","others"];

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
    add_footer_menu(project_cat,"projects");
    
    background_color = color(250,200,100,200);
    project_function = opening_sketch;

}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);

    project_function();

    // if (footer_menu.has_clicked()) footer_menu.update();
    // if (footer_menu.item_changed()) {
    //     var ind = footer_menu.get_index();
    //     project_function = eval(project_list[ind]);
    // }
    
}

function add_aside_text() {
    var twit = createDiv('Projects');
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
// function curling_simulator() {
//     fill(255);
//     text("curling simulator project",100,100);
// }

// function desktop_curling() {
//     fill(255);
//     text("desktop curling project",100,100);
// }

// function p5_demos() {
//     fill(255);
//     text("p5 demos",100,100);
// }

function opening_sketch() {
    fill(255);
    text("opening sketch",100,100);    
}