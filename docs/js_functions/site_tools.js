// global variables class:
class Globals {
    constructor() {}

    // this doesn't work on iOS:
    // static sketch_border = 10;
    // need to use a getter function if you want to do it this way:
    static get sketch_border() {
        return 10;
    }

    // a few useful colors to keep things consistent:
    static get_orange() {
        return color(250,200,100,200);
    }
    static get_blue() {
        return color(100,200,250,200);
    }
    static get_green() {
        return color(200,250,100,200);
    }
    static get_pink() {
        return color(250,100,200,150);
    }
    static get_rust() {
        return color(200,100,100,200);
    }
    
}

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

// add menus:
function add_menu() {
    var menu_labels = ["week","projects","about"];
    var top_menu = new Main_Menu(menu_labels,'menu_up');
    return top_menu;
}

function add_footer_roll(items) {
    var footer_menu = new Footer_Roll(items);
    return footer_menu;
}

function add_footer_menu(itesm) {


}

// add header and footer content:
function add_header_image() {
    var header_img = createImg('/docs/images/logo_side_4.png','logo');
    header_img.size(360,65);
    header_img.parent('heads-up');
    // header_img.mousePressed(function () {console.log('pressed');});
    return header_img;
}

function add_footer_text() {
    var f = select('#menu_down');
    f.html('Let&#39s make something.',true);
    return f;
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

