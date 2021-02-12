

// there is some kind of padding going on for the canvas; will have to figure out some CSS I guess
var menu_buttons = [];
var menu_labels = ["about","projects","donate"];
var canv;
var background_color;
// var ww=$(window).width();
// var wh=$(window).height();
var canvasDiv;

$(window).resize(function() {
    ww = $(window).width();
    wh = $(window).height();
  });

function setup() {
    // canv = createCanvas(windowWidth, windowHeight);

    canvasDiv = document.getElementById('mySketchContainer');
    var width = canvasDiv.offsetWidth;

    canv = createCanvas(width,450);
    canv.parent('mySketchContainer');
    // canv.position(0,0);
    

    // container = select('#myContainer');

    // canv.position(0,0);
    // canv.style('z-index','-1');
    for (var i=0; i<menu_labels.length; i++) {
        menu_buttons[i] = createButton(menu_labels[i]);
        // menu_buttons[i].position(i*130,0); 
        menu_buttons[i].class('button');
        menu_buttons[i].parent('myMenuBar');
        menu_buttons[i].style('float','right');
    }
    
    menu_buttons[0].mousePressed(goToAbout);

    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission)==='function') {
        // iOS 13
        background_color = color(255,0,0);
    
    }
    else {
        // not iOS 13
        background_color = color(0,255,0);
    }
}

function draw() {
    background(background_color);
    fill(0,233,100);
    ellipse(100,100,100,100);

    ww = windowWidth;
    wh = windowHeight;
    var textTo = ww + ', ' + wh;

    textSize(80);
    textAlign(CENTER,CENTER);
    fill(0);
    text(textTo,width/2,height/2);
}

function goToAbout() {
    // window.location.replace("./about");
    window.open("./about","_self")
    // window.open("./about");
    // // location.href = "/about"; 
}

// function windowResized() {
    // canv.width = container.width;
    // canv.height = container.height;
    // console.log(container.viewWidth,container.displayHeight);
    // canv = createCanvas(container.width,container.height);container.width,container.height
    // resizeCanvas(containter.width, container.height);

    // this works, but need to re-create the canvas every resize:
    // canvasDiv = document.getElementById('myContainer');
    // var width = canvasDiv.offsetWidth;
    // canv = createCanvas(width,450);
    // canv.parent('myContainer');
// }

// function windowResized() { 
//     resizeCanvas(windowWidth, windowHeight); 
// } 