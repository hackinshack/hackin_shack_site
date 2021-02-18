// background sketch code:
let background_sketch = function (p) {

    p.setup = function () {
        p.canv = p.createCanvas(windowWidth, windowHeight);
        p.canv.position(0, 0);
        p.canv.style('opacity',0.8);
        p.canv.style('z-index', '-1');
        p.resize();
    };

    p.draw = function () {
        p.background(0, 0, 0);
    };

    p.resize = function () {
        var body = document.body;
        var html = document.documentElement;

        var b_height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

        p.resizeCanvas(windowWidth, b_height);
    }
};

// add top level menu:
function add_menu() {
    var menu_labels = ["week","projects","about"];
    var top_menu = new Menu(menu_labels,'menu_up');
}

// add header and footer content:
function add_header_image() {
    var header_img = createImg('/docs/images/logo_side_4.png','logo');
    header_img.size(360,65);
    header_img.parent('heads-up');
    // header_img.mousePressed(function () {console.log('pressed');});
}

function add_footer_text() {
    var f = select('#menu_down');
    f.html('Let&#39s make something.',true)
}


// functions to fade elements in and out:
// source: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
}

