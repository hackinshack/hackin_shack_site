let standard_page;
let sections = 1;
let function_list = [draw1];
let aside_text = ['Welcome!'];

function setup() {
    standard_page = new Standard_Page(sections,function_list);
    standard_page.add_asides_text(aside_text);

    // add background canvas if desired:
    var body = document.body;
    var canv_height = max(body.clientHeight,windowHeight);
    var canv = createCanvas(windowWidth,canv_height);
    canv.position(0, 0);
    canv.style('opacity', 0.8);
    canv.style('z-index', '-1');
}

function draw() {
    clear();
    background(0);
    fill(255,200,200,150);
    ellipse(mouseX, mouseY, 200, 200);
}

function windowResized() {
    standard_page.resize();

    // to refit background sketch:
    var body = document.body;
    var canv_height = max(body.clientHeight,windowHeight);
    resizeCanvas(windowWidth,canv_height);
}

// add the draw functions associated with each article: 

function draw1(sketch) {
    // need to make a pg that is the right size for the sketch
    // var pg = createGraphics(400,400);
    sketch.clear();
    sketch.background(200,50,250,200);
    sketch.fill(150, 233, 250, 100);
    sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100);
    // console.log("all up in 1");
}


