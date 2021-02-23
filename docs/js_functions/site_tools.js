// background sketch code:
let background_sketch = function (p) {

    p.setup = function () {
        p.canv = p.createCanvas(windowWidth, windowHeight);
        p.canv.position(0, 0);
        p.canv.style('opacity', 0.8);
        p.canv.style('z-index', '-1');
        p.resize();
    };

    p.draw = function () {
        p.background(0, 0, 0);
    };

    p.resize = function () {
        var body = document.body;
        var html = document.documentElement;

        var b_height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        p.resizeCanvas(windowWidth, b_height);
    }
};

// add menus:
function add_menu() {
    var menu_labels = ["about", "projects", "week"];
    var top_menu = new Main_Menu(menu_labels, 'menu_up');
    return top_menu;
}

function add_footer_roll(items) {
    var footer_menu = new Footer_Roll(items);
    return footer_menu;
}

function add_footer_menu(items, parentDir) {
    var footer_menu = new Main_Menu(items, 'menu_down', parentDir, 'footer-button', false);
    return footer_menu;
}

// add header and footer content:
function add_header_image() {
    var header_img = createImg('/docs/images/logo_side_4.png', 'logo');
    header_img.size(360, 65);
    header_img.parent('heads-up');
    // header_img.mousePressed(function () {console.log('pressed');});
    return header_img;
}

function add_footer_text() {
    var f = select('#menu_down');
    f.style('display:grid');
    f.html('Let&#39s make something.', true);
    return f;
}

function clear_article() {
    // remove all elements from article, except sketch
    var a = selectAll('a', '#article');
    for (var i = 0; i < a.length; i++) {
        a[i].remove();
    }
    // console.log(a);
    // a.remove();
}

function set_body_background(img) {
    var body = select('body');
    if (img=='none') {
        body.style('background-image: none');
    }
    else {
        var img_string = 'background-image: url("/docs/images/' + img + '"';
        body.style(img_string);
    }
}

function remove_article() {
    var a = selectAll("#sketch1");
    console.log(a);
    // a.elt.remove();
}

function set_sketch_opacity(op) {
    var opacity = op;
    if (opacity <= 1) opacity = 255*opacity;
    var c = background_color;
    background_color = color(red(c),green(c),blue(c),opacity);
    // console.log(red(c));
}

// functions to fade elements in and out:
// source: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
}