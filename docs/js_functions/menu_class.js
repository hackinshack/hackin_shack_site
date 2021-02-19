

class Main_Menu {

    constructor(labels, parentID, parentDir = "", addHome = true) {
        this.labels = labels;
        this.parent_id = parentID;
        this.buttons = [];
        this.home_button;
        this.add_home = addHome;
        this.parent_dir = parentDir;
        this.create();
    }

    create() {

        // create the "home" button:
        if (this.add_home) {
            this.homeButton = createButton('home');
            this.homeButton.parent(this.parent_id);
            this.homeButton.style('float', 'right');
            this.homeButton.class('button');

            var html_text = "<img src=\" /docs/images/Logo2019shack.png\" width=\"28\" height=\"21\"/>"
            this.homeButton.html(html_text);
            this.homeButton.mousePressed(function () {
                window.open("/docs", "_self");
            })
        }

        // add menu items:
        for (var i = 0; i < this.labels.length; i++) {
            var label = this.labels[i];
            this.buttons[i] = createButton(label);
            this.buttons[i].parent(this.parent_id);
            this.buttons[i].style('float', 'right');
            this.buttons[i].class('button');
            this.buttons[i].mousePressed(this.select_io.bind(this, i));
        }
    }

    select_io(button_index) {
        var bclicked = this.buttons[button_index];
        var new_page = "/docs/" + this.parent_dir + bclicked.elt.outerText;
        window.open(new_page, "_self");
    }
}


class Footer_Roll {

    constructor(item_list) {
        this.items = item_list;
        this.list_index = -1;
        this.last_index = -1;
        this.parent_id = "menu_down";
        this.showList = false;
        this.create();
        this.hasClicked = false;
    }

    create() {
        // add menu items:
        this.nextButton = createButton(">");
        this.nextButton.parent(this.parent_id);
        this.nextButton.style('float', 'right');
        this.nextButton.class('footer-button');
        this.nextButton.mousePressed(this.nextItem.bind(this));

        this.listButton = createButton("list");
        this.listButton.parent(this.parent_id);
        this.listButton.style('float', 'right');
        this.listButton.class('footer-button');
        this.listButton.mousePressed(this.listItems.bind(this));

        this.prevButton = createButton("<");
        this.prevButton.parent(this.parent_id);
        this.prevButton.style('float', 'right');
        this.prevButton.class('footer-button');
        this.prevButton.mousePressed(this.prevItem.bind(this));
    }

    update() {
        if (this.list_index <= 0) {
            this.list_index = 0;
        }
        if (this.list_index >= this.items.length - 1) {
            this.list_index = this.items.length - 1;
        }
    }

    item_changed() {
        if (this.list_index != this.last_index) return true;
        else return false;
    }

    get_index() {
        return this.list_index;
    }

    has_clicked() {
        return this.hasClicked;
    }

    nextItem() {
        this.hasClicked = true;
        this.last_index = this.list_index;
        this.list_index++;
        this.showList = false;
        console.log("index: ", this.list_index);
    }

    prevItem() {
        this.hasClicked = true;
        this.last_index = this.list_index;
        this.list_index--;
        this.showList = false;
        console.log("index: ", this.list_index);
    }

    listItems() {
        this.showList = true;
        console.log("select list");
    }
}


// function setup() {
//     noCanvas();
//     createP('Drag me into "Drag Here!"');
   
//     createP('Drag Here!')
//       .style('background-color: gray')
//       .dragOver(function ()  { changeBG.call(this, 'red'); })
//       .dragLeave(function () { changeBG.call(this, 'gray'); });
//   }
     
//   function changeBG(colour) {
//     this.style('background-color', colour);
//   }