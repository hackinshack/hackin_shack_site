function desktop(fresh_load = true) {

    if (fresh_load) {
        clear_article();

        // create the user interface elements:
        var link = createA('', 'desktop link');
        link.parent('sketch1');
        link.position(300, 500);
        console.log("I'm creating a link from desktop");

        var textBox = createDiv('putting some text wherever the f it wants to go  \
        even if it wants to run all over the page I do not care');
        textBox.parent('sketch1');
        textBox.class('sketch-div');
        textBox.position(0, 0);

        // back_sketch.canv.style('opacity', 0.5);

        // define any variables that will be needed:
        // var desktop_sim = new Animate_Container();

    }

    fill(255);
    textSize(30);
    text("desktop curling project", width / 2, height / 2);
}