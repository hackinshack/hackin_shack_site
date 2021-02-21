function simulator(fresh_load=true) {

    // this is essentially "setup" for this chuck of code:
    if (fresh_load) {

        clear_article();
        
        var link = createA('', 'new simulator link');
        link.parent('sketch1');
        link.position(300, 500);
        console.log("I'm creating a link");
    }

    fill(255);
    textSize(30);
    text("curling simulator project", width / 2, height / 2);
}