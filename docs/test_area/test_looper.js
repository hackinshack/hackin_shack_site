let looper_page;

var aside_text = "Curling Projects";
var function_list = ["opening","simulator","desktop","table_top"];
var link_labels = ["opening sketch","curling simulator","desktop curling","table top curling"];

function setup() {
    looper_page = new Looper_Page(function_list,link_labels);
    looper_page.add_aside_text(aside_text);
}

function draw() {

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

function opening(fresh_load=true) {
    var p = looper_page.sketch;

    if (fresh_load) {
        background(100);
        // set_body_background('none');
        // set_sketch_opacity(200);

    }
    p.background(100,240,130);
    looper_page.show_links_list();
}