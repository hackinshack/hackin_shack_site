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

function setup() {

    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');

    create_menu_up();
    add_header_image();
    add_footer_image();
    
    background_color = color(250,200,100);
}

function create_menu_up() {
    for (var i=0; i<menu_labels.length; i++) {
        menu_buttons[i] = createButton(menu_labels[i]);
        menu_buttons[i].class('button');
        menu_buttons[i].parent('menu_up');
        menu_buttons[i].style('float','right');
        menu_buttons[i].mousePressed(menuSelect);
    }
}

function menuSelect() {
    for (var i=0; i< menu_labels.length; i++) {
        var label = menu_labels[i];
        console.log(this.elt.outerText,label);
        if (this.elt.outerText == label) {
            var new_page = "./" + label;
            window.open(new_page, "_self");
            return;
        }
    }
}

function add_header_image() {
    header_img = createImg('/data/Logo2019shack.png','logo');
    header_img.parent('menu_up');
    header_img.size(60,45);
    header_img.style('opacity',0.5);
    header_img.position(10,10);
}

function add_footer_image() {
    header_img = createImg('/data/Logo2019words.png','words');
    header_img.parent('menu_down');
    header_img.size(220,45);
    header_img.style('opacity',0.5);
    // header_img.position(10,10);
}

function draw() {
    background(background_color);
    fill(150,233,250);
    ellipse(mouseX,mouseY,100,100);
}

function windowResized() {
    sketch_width = canvasDiv.offsetWidth-2*sketch_border;
    sketch_height = canvasDiv.offsetHeight-2*sketch_border;
    // canv.size(sketch_width,sketch_height); // this throws an error but still works; may be more efficient even with error
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
}
