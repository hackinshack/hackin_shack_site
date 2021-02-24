class Embedded_Sketch {
    constructor(parent_article_) {
        this.sketch = new p5(e_sketch);
        this.sketch.parent = this;
        
        this.parent_article = parent_article_;
        this.canvas;
        this.sketch_width;
        this.sketch_height;
        this.sketch_border;


        canvasDiv = document.getElementById('sketch1');

        sketch_width = canvasDiv.offsetWidth - 2 * sketch_border;
        sketch_height = canvasDiv.offsetHeight - 2 * sketch_border;
        canv = createCanvas(sketch_width, sketch_height);
        canv.position(sketch_border, sketch_border);
        canv.parent('sketch1');
    }

    setup_canvas() {


    }

    
}

// sketch template:
let e_sketch = function (p) {

    var parent;

    p.setup = function () {
      p.resize();
    };
  
    p.draw = function () {
      p.clear();
      parent.draw();
    };
  
    p.resize = function () {
      p.canv = p.createCanvas(parent.sketch_width, parent.sketch_height);
      p.canv.position(parent.sketch_border, parent.sketch_border);
      p.canv.parent(parent.parent_article);
    }
  };