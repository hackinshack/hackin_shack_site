var canv;
var background_color;
var canvasDiv;
var sketch_width, sketch_height;
var sketch_border = 10;
let back_sketch;

function setup() {
    back_sketch = new p5(background_sketch);
    canvasDiv = document.getElementById('sketch1');

    resize();
    
    add_header_image();
    add_menu();
    add_aside_text();
    add_footer_text();

    background_color = Globals.get_orange();
}

function draw() {
    clear();
    background(background_color);
    fill(150,233,250,100);
    ellipse(mouseX,mouseY,100,100);
}

function add_aside_text() {
    var twit = createDiv('Welcome!');
    twit.parent('side1');
    twit.style('font-size: 20px');
}

function resize() {
    sketch_width = canvasDiv.offsetWidth -2*sketch_border;
    sketch_height = canvasDiv.offsetHeight -2*sketch_border;

    canv = createCanvas(sketch_width,sketch_height);
    canv.position(sketch_border,sketch_border);
    canv.parent('sketch1');
}

// this is a p5 function:
function windowResized() {
    resize();
    back_sketch.resize();
}


// var loadJS = function(url, implementationCode, location){
//     //url is URL of external file, implementationCode is the code
//     //to be called from the file, location is the location to 
//     //insert the <script> element

//     var scriptTag = document.createElement('script');
//     scriptTag.src = url;

//     scriptTag.onload = implementationCode;
//     scriptTag.onreadystatechange = implementationCode;

//     location.appendChild(scriptTag);
// };
// var yourCodeToBeCalled = function(){
// //your code goes here
// }
// loadJS('yourcode.js', yourCodeToBeCalled, document.body);