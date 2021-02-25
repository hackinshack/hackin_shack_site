// var canv;
// var background_color;
// var canvasDiv;
// var sketch_width, sketch_height;
// var sketch_border = 10;
// let back_sketch;
let standard_page;


function setup() {
    standard_page = new Standard_Page(2,[draw1,draw2]);
}

function draw() {
    // draw is taken care of in the individual sketches on the page
    
}

function windowResized() {
    standard_page.resize();
}

// add the draw functions associated with each article: 

function draw1(sketch) {
    // need to make a pg that is the right size for the sketch
    // var pg = createGraphics(400,400);
    sketch.clear();
    sketch.background(200,50,250);
    sketch.fill(150, 233, 250, 100);
    sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100);
    // console.log("all up in 1");
}

function draw2(sketch) {
    sketch.clear();
    sketch.background(100,250,50);
    sketch.fill(150, 233, 250, 100);
    sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100);
    // console.log("all up in 2");
}


