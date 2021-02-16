let sketch = function(p) {

    let img;

    p.preload = function() {
        img = loadImage('images/Logo2019shack.png');
    }

    p.setup = function() {
        p.canv = p.createCanvas(windowWidth, windowHeight);
        p.canv.position(0,0);
        p.canv.style('z-index','-1');
    
        img.resize(windowWidth,0);

    };

    p.draw = function() {
        p.background(0);
        p.tint(255,100);
        p.image(img, 0, 0);
    };

    p.resize = function() {
        // var body = document.body;
        // var html = document.documentElement;

        // var height = Math.max( body.scrollHeight, body.offsetHeight, 
        //                html.clientHeight, html.scrollHeight, html.offsetHeight );

        p.resizeCanvas(windowWidth, windowHeight);
        img.resize(windowWidth,0);
    }
};