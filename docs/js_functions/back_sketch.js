let sketch = function (p) {


    // p.preload = function () {



    //     img_back = loadImage('images/tools.jpg', img => {
    //         // img = loadImage('images/cropped-blue_vert.jpg', img => {
    //         // img.resize(windowWidth,0);
    //         // p.tile_image();

             
            
    //             p.image(img_back, 0, 0);
    //     });
    // }

    p.setup = function () {
        p.canv = p.createCanvas(windowWidth, windowHeight);
        p.canv.position(0, 0);
        p.canv.style('opacity',0.8);
        p.canv.style('z-index', '-1');

        // load the backgroud image:
        // let img_back = createImg('images/tools.jpg','background image');
        // img_back.parent('back_image');
    };

    p.draw = function () {
        p.background(0, 0, 0);
        // p.tint(255, 100);
        // p.tile_image();
        // p.image(img_back, 0, 0);
    };

    p.tile_image = function () {

        let w = img_back.width;
        let h = img_back.height;
        let wcount = windowWidth / w + 1;
        let hcount = windowHeight / h + 1;

        wcount = 2;
        hcount = 2;

        for (let i = 0; i < wcount; i++) {
            for (let j = 0; j < hcount; j++) {
                let xpos = i*w;
                let ypos = j*h;
                p.image(img_back, xpos, ypos);
            }
        }
    }

    p.resize = function () {
        // var body = document.body;
        // var html = document.documentElement;

        // var height = Math.max( body.scrollHeight, body.offsetHeight, 
        //                html.clientHeight, html.scrollHeight, html.offsetHeight );

        p.resizeCanvas(windowWidth, windowHeight);
        // p.tile_image();

        // img.resize(windowWidth,0);
    }
};