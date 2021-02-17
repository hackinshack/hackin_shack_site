let sketch = function (p) {

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