function desktop(fresh_load=true) {

    if (fresh_load) {
        clear_article();

        var link = createA('', 'desktop link');
        link.parent('sketch1');
        link.position(300, 500);
        console.log("I'm creating a link from desktop");
    }

    fill(255);
    textSize(30);
    text("desktop curling project", width / 2, height / 2);
}