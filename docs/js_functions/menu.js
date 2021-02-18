class Menu {

    constructor(labels, parentID) {
        this.labels = labels;
        this.parent_id = parentID;
        this.buttons = [];
        this.home_button;
        this.create();
    }

    create() {

        // create the "home" button:
        this.homeButton = createButton('home');
        this.homeButton.parent(this.parent_id);
        this.homeButton.style('float','right');
        this.homeButton.class('button');

        var html_text = "<img src=\" /docs/images/Logo2019shack.png\" width=\"28\" height=\"21\"/>"
        this.homeButton.html(html_text);
        this.homeButton.mousePressed(function() {window.open("/docs", "_self");})

        // add menu items:
        for (var i=0; i<this.labels.length; i++) {
            var label = this.labels[i];
            this.buttons[i] = createButton(label);
            this.buttons[i].parent(this.parent_id);
            this.buttons[i].style('float','right');
            this.buttons[i].class('button');
            this.buttons[i].mousePressed(this.select);
        }
    }

    select() {
        // console.log(this.elt.outerText);
        var new_page = "/docs/" + this.elt.outerText;
        window.open(new_page, "_self");
    }
}

