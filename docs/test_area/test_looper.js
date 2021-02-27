let looper_page;

var aside_text = "Curling Projects";
var function_list = ["opening","simulator","desktop","table_top"];
var link_labels = ["opening sketch","curling simulator","desktop curling","table top curling"];

function setup() {
    looper_page = new Looper_Page(function_list,link_labels);
    looper_page.add_aside_text(aside_text);

    // add background canvas if desired:
    var body = document.body;
    var canv = createCanvas(windowWidth,body.clientHeight);
    canv.position(0, 0);
    canv.style('opacity', 0.8);
    canv.style('z-index', '-1');
}

function draw() {

    // clear();
    // background(0);
    // fill(255,200,200,150);
    // ellipse(mouseX, mouseY, 200, 200);

    looper_page.update();
}

function windowResized() {
    looper_page.resize();

    // to refit background sketch:
    var body = document.body;
    resizeCanvas(windowWidth,body.clientHeight);
}

function mousePressed() {
    looper_page.mseClicked();
}

// function mouseClicked() {
//     looper_page.mseClicked();
// }

function opening(fresh_load=true) {
    var p = looper_page.sketch;

    if (fresh_load==true) {
        looper_page.clear_links();
        console.log("first load");
    }

    p.clear();
    p.background(100,240,130,200);
    looper_page.show_links_list();
}

// function simulator(fresh_load=true) {

//     var p = looper_page.sketch;

//     if (fresh_load==true) {
//         looper_page.clear_links();
//         looper_page.add_link('https://p5js.org/reference/#/p5/createA','new table-top link', 300, 500);
//     }
    
//     p.clear();
//     p.background(200,100,130,20);
//     p.textAlign(CENTER,CENTER);
//     p.fill(255);
//     p.textSize(30);
//     p.text("simulator project",p.width/2,p.height/2);

// }