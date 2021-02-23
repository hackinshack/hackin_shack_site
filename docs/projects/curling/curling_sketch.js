var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var footer_menu;

var main_title = "Curling Projects"
var aside_text = "Curling Projects"
var rolling_list = ["opening","simulator","desktop","table_top"];
var rolling_titles = ["opening sketch","curling simulator","desktop curling","table top curling"];
var roll_container;

var backgroung_image;

function preload() {
    background_image = loadImage('/docs/images/cape_cod_curling.jpg');
}

function setup() {
    back_sketch = new p5(background_sketch);
    canvasDiv = document.getElementById('sketch1');
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');

    roll_container = new Roll_Container(rolling_list,rolling_titles);

    background_color = Globals.get_green();


    add_menu();
    add_header_image();
    add_aside_text(aside_text);
}

function draw() {
    clear();
    // image(background_image,0,0);
    // background(background_image);
    background(background_color);

    tint(255,100);
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

// the "clicked" function does not seem to work on iphone -- need "pressed"
function mousePressed() {
    roll_container.mseClicked();
}

function opening(fresh_load) {
    if (fresh_load) {
        clear_article();
        set_body_background('none');
        // set_body_background('cape_cod_curling.jpg');
        set_sketch_opacity(200);

        // var body = select('body');
        // body.style('background-image: url("/docs/images/cape_cod_curling.jpg"');
        // back_sketch.canv.style('opacity', 0.7);

        // var body = select('article');
        // body.style('background-image: url("/docs/images/cape_cod_curling.jpg"');
        // back_sketch.canv.style('opacity', 0.7);


    
    }

    roll_container.show_list();
    
    // fill(255);
    // textSize(30);
    // textAlign(CENTER,CENTER);
    // text("Curling",width/2,100);    
}