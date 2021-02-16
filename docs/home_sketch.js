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
    
    background_color = color(250,200,100,200);

    // let aside_img = createImg('./images/Logo2019shack.png','logo');
    // aside_img.class('displayed');
    // aside_img.parent('side1');
    // aside_img.size(160,120);

    let aside = select('#side1-bottom');
    aside.html('This week in the Shack: <br>\
    we embark upon our new adventure.',true);

    // aside_img.style('opacity',0.5);
    
    // let aside_top = select('#side1-top');
    // aside_top.html('<h1>Welcome to Hackin&#39; Shack, and the corresponding shack attack.</h1>');

    // let aside_middle = select('#side1-middle');
    // aside_middle.html('This is where all the magic happens! I could go on and on about \
    // all the magic but I really just want to see what a paragraph looks like.');

    // let aside_bottom = select('#side1-bottom');
    // aside_bottom.html('<h3>Let&#39s make something.</h3>');
    // aside.html('<h1>Put something </h1>');
}

// function create_menu_up() {
//     for (var i=0; i<menu_labels.length; i++) {
//         menu_buttons[i] = createButton(menu_labels[i]);
//         menu_buttons[i].class('button');
//         menu_buttons[i].parent('menu_up');
//         menu_buttons[i].style('float','right');
//         menu_buttons[i].mousePressed(menuSelect);
//     }
// }

// function menuSelect() {
//     for (var i=0; i< menu_labels.length; i++) {
//         var label = menu_labels[i];
//         console.log(this.elt.outerText,label);
//         if (this.elt.outerText == label) {
//             var new_page = "./" + label;
//             window.open(new_page, "_self");
//             return;
//         }
//     }
// }

function add_header_image() {
    var header_img = createImg('./images/logo_side_4.png','logo');
    header_img.size(360,65);
    header_img.parent('heads-up');
    // header_img.class('displayed');
    // header_img.style('opacity',0.5);
    header_img.mousePressed(function () {console.log('pressed');})

    // var header_img2 = createImg('./images/Logo2019words.png','words');
    // header_img2.parent('heads-up');
    // header_img2.class('displayed');
    // header_img2.size(220,45);
    // header_img2.style('opacity',0.5);

}

function add_footer_image() {
    // header_img = createImg('./images/Logo2019words.png','words');
    // header_img.class('displayed');
    // header_img.parent('menu_down');
    // header_img.size(220,45);
    // header_img.style('opacity',0.5);
    // header_img.position(10,10);

    var f = select('#menu_down');
    f.html('Let&#39s make something.',true)


}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,50);
    ellipse(mouseX,mouseY,100,100);
}

function windowResized() {
    sketch_width = canvasDiv.offsetWidth-2*sketch_border;
    sketch_height = canvasDiv.offsetHeight-2*sketch_border;
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
    back_sketch.resize();
}
