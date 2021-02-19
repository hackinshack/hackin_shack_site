var canv;
var background_color;
var background_color2, background_color3;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;
var sketch_02, sketch_03;
var pg_about, pg_mission, pg_board;

// "about" graphics:
function draw_about() {
  var pg = pg_about;
  pg.clear();
  pg.background(background_color);
  pg.fill(150, 233, 250, 100);
  pg.ellipse(mouseX, mouseY, 100, 100);
  image(pg,0,0);
}

// "mission" graphics
function draw_mission(draw_sketch) {
  var pg = pg_mission;
  pg.clear();
  pg.background(background_color2);
  pg.fill(150, 233, 250, 100);
  pg.ellipse(draw_sketch.mouseX, draw_sketch.mouseY, 100, 100);
  draw_sketch.image(pg,0,0);
}

// "board" graphics
function draw_board(draw_sketch) {
  var pg = pg_board;
  pg.clear();
  pg.background(background_color3);
  pg.fill(150, 233, 250, 100);
  pg.ellipse(draw_sketch.mouseX, draw_sketch.mouseY, 100, 100);
  draw_sketch.image(pg,0,0);
}

// _________________________________________________________
// p5 setup and draw loop:

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

  background_color = Globals.get_orange();
  background_color2 = Globals.get_green();
  background_color3 = Globals.get_blue();

  sketch_02 = new p5(sketch_2);
  sketch_03 = new p5(sketch_3);

  pg_about = createGraphics(sketch_width, sketch_height);
  pg_mission = createGraphics(sketch_width, sketch_height);
  pg_board = createGraphics(sketch_width, sketch_height);
  pg_mission.parent('sketch2');
  pg_board.parent('sketch3');
}

function draw() {
  clear();
  draw_about();
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

function resize() {
  sketch_width = canvasDiv.offsetWidth - 2 * sketch_border;
  sketch_height = canvasDiv.offsetHeight - 2 * sketch_border;
  canv = createCanvas(sketch_width, sketch_height);
  canv.position(sketch_border, sketch_border);
  canv.parent('sketch1');
}

function windowResized() {
  // sketch_width = canvasDiv.offsetWidth - 2 * sketch_border;
  // sketch_height = canvasDiv.offsetHeight - 2 * sketch_border;
  // canv = createCanvas(sketch_width, sketch_height);
  // canv.parent('sketch1');

  resize();
  back_sketch.resize();
  sketch_02.resize();
  sketch_03.resize();
}

// _________________________________________________________
// sketch 2:
let sketch_2 = function (p) {

  p.setup = function () {
    // p.canv = p.createCanvas(sketch_width, sketch_height);
    // p.canv.position(sketch_border, sketch_border);
    // p.canv.parent('sketch2');
    p.resize();
  };

  p.draw = function () {
    p.clear();
    draw_mission(this);
  };

  p.resize = function () {
    p.canv = p.createCanvas(sketch_width, sketch_height);
    p.canv.position(sketch_border, sketch_border);
    p.canv.parent('sketch2');
  }
};

// __________________________________________________________
// sketch 3:
let sketch_3 = function (p) {

  p.setup = function () {
    // p.canv = p.createCanvas(sketch_width, sketch_height);
    // p.canv.position(sketch_border, sketch_border);
    // p.canv.parent('sketch3');
    p.resize();
  };

  p.draw = function () {
    p.clear();
    draw_board(this);
  };

  p.resize = function () {
    p.canv = p.createCanvas(sketch_width, sketch_height);
    p.canv.position(sketch_border, sketch_border);
    p.canv.parent('sketch3');
  }
};