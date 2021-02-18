var canv;
var background_color;
var background_color2, background_color3;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var sketch_02, sketch_03;

function setup() {
  back_sketch = new p5(background_sketch);
  canvasDiv = document.getElementById('sketch1');
  sketch_width = canvasDiv.offsetWidth - 2 * sketch_border;
  sketch_height = canvasDiv.offsetHeight - 2 * sketch_border;

  canv = createCanvas(sketch_width, sketch_height);
  canv.position(sketch_border, sketch_border);
  canv.parent('sketch1');

  add_menu();
  add_header_image();
  add_footer_text();
  add_aside_text();

  background_color = color(250, 200, 100, 200);
  background_color2 = color(200,250,100,200);
  background_color3 = color(100,200,250,200);

  sketch_02 = new p5(sketch_2);
  sketch_03 = new p5(sketch_3);
}

function draw() {
  clear();
  background(background_color);
  fill(150, 233, 250, 100);
  ellipse(mouseX, mouseY, 100, 100);
}

function add_aside_text() {
  var sidetext1 = createDiv('About Us');
  sidetext1.parent('side1');
  sidetext1.style('font-size: 24px');

  var sidetext2 = createDiv('Mission');
  sidetext2.parent('side2');
  sidetext2.style('font-size: 24px');

  var sidetext3 = createDiv('Board');
  sidetext3.parent('side3');
  sidetext3.style('font-size: 24px');
}

function windowResized() {
  sketch_width = canvasDiv.offsetWidth - 2 * sketch_border;
  sketch_height = canvasDiv.offsetHeight - 2 * sketch_border;
  canv = createCanvas(sketch_width, sketch_height);
  canv.parent('sketch1');


  back_sketch.resize();
}

// sketches 2 and 3:
let sketch_2 = function (p) {

  p.setup = function () {
    p.canv = p.createCanvas(sketch_width, sketch_height);
    p.canv.position(sketch_border, sketch_border);
    p.canv.parent('sketch2');
  };

  p.draw = function () {
    p.clear();
    p.background(background_color2);
  };

  p.resize = function () {
    p.canv = createCanvas(sketch_width, sketch_height);
    p.canv.parent('sketch2');
  }
};

let sketch_3 = function (p) {

  p.setup = function () {
    p.canv = p.createCanvas(sketch_width, sketch_height);
    p.canv.position(sketch_border, sketch_border);
    p.canv.parent('sketch3');
  };

  p.draw = function () {
    p.clear();
    p.background(background_color3);
  };

  p.resize = function () {
    p.canv = createCanvas(sketch_width, sketch_height);
    p.canv.parent('sketch3');
  }
};