var menu_buttons = [];
var menu_labels = ["projects","about"];

var canv;
let xoff = 0.0;
let yoff = 0.5;

function setup() {
    canv = createCanvas(windowWidth, 3*windowHeight);
    canv.position(0,0);
    canv.style('z-index','-1');
    create_menu_up();
}

function draw() {
    background(100,200,200);
    
    xoff = xoff + 0.01;
    yoff = yoff + 0.01;
    let x = noise(xoff) * width;
    let y = noise(yoff) * height/3;
    ellipse(x,y,100,100);
}

function windowResized() { 
    resizeCanvas(windowWidth, 3*windowHeight); 
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
            var new_page = "../" + label;
            window.open(new_page, "_self");
            return;
        }
    }
}