function table_top(fresh_load=true) {

    if (fresh_load) {
        clear_article();
        var link = createA('', 'new table-top link');
        link.parent('sketch1');
        link.position(300, 500);
        console.log("I'm creating a link");
    }
    
    fill(255);
    textSize(30);
    text("table top curling project",width/2,height/2);

}