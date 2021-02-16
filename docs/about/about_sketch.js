

let back_sketch = new p5(sketch);
var menu_buttons = [];
var menu_labels = ["projects","about"];

var canv, canvasDiv;
let xoff = 0.0;
let yoff = 0.5;

let link1;
let activated = false;

let bulb1;
let zigzag1;
let circle1;
let lines1;
let switch1;

let clicked = [0, 1];
let index = 0;
let angle = 0;

let bulbCenterX;
let bulbCenterY;

let bulbSize;
let zigSize;

let theTop;
let rightSide;
let leftSide;
let theBottom;

let r = 255;
let g = 255;
let b = 255;
let pg;
let sketch_border = 10;

function setup() {

    canv = createCanvas(400,400);
    canvasDiv = document.getElementById('sketch1');
    canv.parent('sketch1');
    create_menu_up();
    pg = createGraphics(200,200);
    // pg.parent('menu_up');

    // createCanvas(windowWidth, windowHeight - 10);
    angleMode(DEGREES);
    rectMode(CENTER);
    textAlign(CENTER);
    bulbSize = width/550;
    zigSize = width/700;
    bulbCenterX = width/2;
    bulbCenterY = height/2 + 60 * zigSize;
    rightSide = bulbCenterX + 250 * zigSize;
    leftSide = bulbCenterX - 250 * zigSize;
    let zigCenterX = rightSide + 15 * bulbSize;
    let zigCenterY = height/2;
    theTop = zigCenterY - 120 * zigSize;
    let bulbWidth = 80 * bulbSize;
    let circleCenterX = bulbCenterX + 50 * bulbSize;
    let circleCenterY = 50 * zigSize;
    let linesCenterY1 = zigCenterY - 10 * zigSize;
    let linesCenterY2 = linesCenterY1 + 20 * zigSize;
    bulb1 = new Bulb(bulbCenterX, bulbCenterY, bulbWidth, bulbWidth, 120, 60); 
    zigzag1 = new ZigZag(zigCenterX, zigCenterY - 35 * zigSize);
    circle1 = new Circle(circleCenterX, circleCenterY, 20 * zigSize, 20 * zigSize);
    lines1 = new Lines(linesCenterY1, linesCenterY2);
    switch1 = new Switch(0, 0, -48 * zigSize, 35 * bulbSize);
    link1 = new Link('Our Projects', bulbCenterX, bulbCenterY - 50 * bulbSize);
}

function draw() {
    
    pg.background(0);
    pg.fill(255);
    pg.ellipse(50,50,50,50);
    
    background(14, 122, 221);
    bulb1.show();
    image(pg, 0,0);
    zigzag1.show(bulb1, bulbSize);
    circle1.show(zigzag1);
    lines1.show(bulb1);
    push();
    translate(leftSide + 173 * zigSize, theTop);
    rotate(angle);
    switch1.show();
    pop();
    link1.show();
    if (index === 1 & angle < 20) {
      angle++;
    }
    if (angle === 20) {
         b = 40;
      activated = true;
    }
    // link1.goTo('https://hackinshack.org/projects');
}

function windowResized() { 
    sketch_width = canvasDiv.offsetWidth-2*sketch_border;
    sketch_height = canvasDiv.offsetHeight-2*sketch_border;
    // canv.size(sketch_width,sketch_height); // this throws an error but still works; may be more efficient even with error
    canv = createCanvas(sketch_width,sketch_height);
    canv.parent('sketch1');
} 

function create_menu_up() {
    for (var i=0; i<menu_labels.length; i++) {
        menu_buttons[i] = createButton(menu_labels[i]);
        menu_buttons[i].class('button');
        menu_buttons[i].parent('menu_up');
        menu_buttons[i].style('float','right');
        menu_buttons[i].mousePressed(menuSelect);
    }
}

function menuSelect() {
    for (var i=0; i< menu_labels.length; i++) {
        var label = menu_labels[i];
        console.log(this.elt.outerText,label);
        if (this.elt.outerText == label) {
            var new_page = "../" + label;
            window.open(new_page, "_self");
            return;
        }
    }
}

function mousePressed() {
    if (switch1.within(mouseX, mouseY)) {
      index ++
      if (index === clicked.length) {
        index = 0
      }
    }
  }

class Bulb {
    constructor(x, y, w, h, start, stop) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.start = start;
      this.stop = stop;
    }
    
    show() {
      fill(150);
      strokeWeight(3 * bulbSize);
      stroke(0);
      let spiralWidth = 35 * bulbSize;
      let spiralHeight = 80 * bulbSize;
      let heightDiff = 10 * bulbSize;
      let widthDiff = 5 * bulbSize;
      rect(this.x, this.y + this.h/2, spiralWidth, spiralHeight);
      rect(this.x, this.y + this.h/2, spiralWidth, spiralHeight - heightDiff);
      rect(this.x, this.y + this.h/2, spiralWidth, spiralHeight - 2 * heightDiff);
      rect(this.x, this.y + this.h/2, spiralWidth, spiralHeight - 3 * heightDiff);
      fill(r,g,b);
      rect(this.x, this.y + this.h/2, spiralWidth + widthDiff, spiralHeight - 4 * heightDiff);
      arc(this.x, this.y, this.w, this.h, this.start, this.stop, OPEN );
      strokeWeight(2 * bulbSize);
      triangle(this.x - 10 * bulbSize, this.y, this.x + 10 * bulbSize, this.y, this.x, this.y + 30 * bulbSize);
      line(this.x, this.y + 30 * bulbSize, this.x, this.y + 58 * bulbSize);
      
      theBottom = this.y + this.h/2 + (spiralHeight - 5 * heightDiff)
      strokeWeight(3 * bulbSize);
      line(this.x, theBottom, rightSide, theBottom);
      line(this.x, theBottom, leftSide, theBottom);
    }
  }
  
  class ZigZag {
    constructor(x1, y1) {
      this.x1 = x1;
      this.y1 = y1;
    }
   
    show(other, size) {
      let y = this.y1 - 5 * zigSize;
      let y2 = this.y1 + 10 * zigSize;
      let y3 = this.y1 + 20 * zigSize;
      let y4 = this.y1 + 30 * zigSize;
      let y5 = this.y1 + 40 * zigSize;
      let y6 = this.y1 + 50 * zigSize;
      let y7 = this.y1 + 55 * zigSize;
      
      let x2 = this.x1 - 40 * zigSize;
      
      strokeWeight(3 * bulbSize);
      line(rightSide, y, x2, this.y1);
      line(x2, this.y1, this.x1, y2);
      line(this.x1, y2, x2, y3);
      line(x2, y3, this.x1, y4);
      line(this.x1, y4, x2, y5);
      line(x2, y5, this.x1, y6);
      line(this.x1, y6, rightSide, y7);
      
      line(rightSide, y, rightSide, theTop);
      
      line(rightSide, y7, rightSide, theBottom);
    }
  }
  
  class Circle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    
    show(other) {
      line(this.x, theTop, rightSide, theTop);
      fill(0);
      ellipse(this.x, theTop, this.w, this.h);
    }
  }
  
  class Lines {
    constructor(y1, y2) {
          this.y1 = y1;
      this.y2 = y2;
    }
    
    show() {
      let lineDiff1 = 35 * zigSize;
      let lineDiff2 = 20 * zigSize;
      line(leftSide, theTop, leftSide, this.y1);
      line(leftSide, theBottom, leftSide, this.y2);
      line(leftSide - lineDiff1, this.y1, leftSide + lineDiff1, this.y1);
      line(leftSide - lineDiff2, this.y2, leftSide + lineDiff2, this.y2);
      line(leftSide, theTop, leftSide + 173 * zigSize, theTop);
    }
  }
  
  class Switch {
    constructor(x, y, y2, r) {
      this.x = x;
      this.y = y;
      this.y2 = y2;
      this.r = r;
    }
  
    show() {
      let x2 = this.x + 132 * zigSize;
      line(this.x, this.y, x2 - this.r/2, this.y2 + this.r/5);
      // stroke(250, 55, 5);
      // strokeWeight(7 * bulbSize);
      // noFill();
      
      fill(250, 55, 5);
      stroke(0);
      ellipse(x2, this.y2, this.r, this.r);
      stroke(0);
      strokeWeight(3 * bulbSize);
    }
  
    within(mX, mY) {
      let x2 = this.x + 132 * zigSize;
      let d = dist(mX - (leftSide + 165 * zigSize), mY - theTop, x2, this.y2);
      if (d <= this.r/2) {
        return true;
      }
    }
  }
  
  class Link {
    constructor(word, x, y) {
      this.word = word;
      this.x = x;
      this.y = y;
      this.wasCalled = false; 
    }
  
    show() {
      // strokeWeight(1);
      noStroke();
      textSize(23 * bulbSize);
      fill(0);
      // fill(250, 55, 5);
      text(this.word, this.x, this.y);
    }
  
    goTo(link) {
      if (!this.wasCalled && activated) {
        window.open(link,'_parent'); 
        this.wasCalled = true;	
      }
    }
  }