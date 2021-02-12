var menu_buttons = [];
var menu_labels = ["projects","about"];
var canv;
var background_color;
var canvasDiv;
var container;
var standard_height = 450;
var sketch_width, sketch_height;

function setup() {

    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth;
    sketch_height = standard_height;

    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');

    create_menu_up();
    
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

function draw() {
    background(background_color);
    fill(150,233,250);
    ellipse(mouseX,mouseY,100,100);
}

function windowResized() {
    sketch_width = canvasDiv.offsetWidth;
    // canv.size(sketch_width,sketch_height); // this throws an error but still works; may be more efficient even with error
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
}
