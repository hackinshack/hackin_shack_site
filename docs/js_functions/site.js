function add_header_image() {
    var header_img = createImg('./images/logo_side_4.png','logo');
    header_img.size(360,65);
    header_img.parent('heads-up');
    header_img.mousePressed(function () {console.log('pressed');})
}

