class Embedded_Graphic {
    constructor(xo_,yo_,w_,h_,draw_function) {
        this.origin = createVector(xo_,yo_);
        this.pg = createGraphics(w_,h_);
        this.draw = draw_function;
        // console.log(this.draw);
    }

    resize(xo_,yo_,w_,h_) {
        this.origin = createVector(xo_,yo_);
        this.pg = createGraphics(w_,h_);
    }

    display() {
        this.draw(this.pg);
        image(this.pg,this.origin.x,this.origin.y);
    }

}
