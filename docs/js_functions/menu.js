class Menu {

    constructor(labels, parentID) {
        this.labels = labels;
        this.parent_id = parentID;
        this.buttons = [];
        this.create();
    }

    create() {

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
        console.log(this.elt.outerText);
        var new_page = "./" + this.elt.outerText;
        window.open(new_page, "_self");
    }
}
