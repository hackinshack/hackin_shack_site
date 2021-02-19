// global variables class:
class Globals {
    constructor() {}

    // this doesn't work on iOS:
    // static sketch_border = 10;
    // need to use a getter function if you want to do it this way:
    static get sketch_border() {
        return 10;
    }

    // a few useful colors to keep things consistent:
    static get_orange() {
        return color(250, 200, 100, 200);
    }
    static get_blue() {
        return color(100, 200, 250, 200);
    }
    static get_green() {
        return color(200, 250, 100, 200);
    }
    static get_pink() {
        return color(250, 100, 200, 150);
    }
    static get_rust() {
        return color(200, 100, 100, 200);
    }

}

// ------------------- Main_Menu --------------------------
class Main_Menu {

    constructor(labels, parentID, parentDir = "", btn_class = "button", addHome = true) {
        this.labels = labels;
        this.parent_id = parentID;
        this.buttons = [];
        this.home_button;
        this.add_home = addHome;
        this.parent_dir = parentDir;
        this.button_class = btn_class;
        this.create();
    }

    create() {

        // create the "home" button:
        if (this.add_home) {
            this.homeButton = createButton('home');
            this.homeButton.parent(this.parent_id);
            this.homeButton.style('float', 'right');
            this.homeButton.class(this.button_class);

            var html_text = "<img src=\" /docs/images/Logo2019shack.png\" width=\"28\" height=\"21\"/>"
            this.homeButton.html(html_text);
            this.homeButton.mousePressed(function () {
                window.open("/docs", "_self");
            })
        }

        // add menu items:
        var j = 0;
        for (var i = this.labels.length - 1; i >= 0; i--) {
            var label = this.labels[i];
            this.buttons[j] = createButton(label);
            this.buttons[j].parent(this.parent_id);
            this.buttons[j].style('float', 'right');
            this.buttons[j].class(this.button_class);
            this.buttons[j].mousePressed(this.select.bind(this, j));
            j++;
        }
    }

    select(button_index) {
        var bclicked = this.buttons[button_index];
        var mid_text = this.parent_dir + "/";
        if (this.parent_dir == "") mid_text = "";
        var new_page = "/docs/" + mid_text + bclicked.elt.outerText;
        window.open(new_page, "_self");
    }
}

// ------------------- Footer_Roll --------------------------
class Footer_Roll {

    constructor(item_list) {
        this.items = item_list;
        this.list_index = -1;
        this.last_index = -2;
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
        if (this.list_index != this.last_index) {
            this.last_index = this.list_index;
            return true;
        } else return false;
    }

    force_change(index) {
        this.list_index = index;
        this.last_index = -2;
        this.showList=false;
    }

    get_index() {
        return this.list_index;
    }

    has_clicked() {
        return this.hasClicked;
    }

    nextItem() {
        this.hasClicked = true;
        this.list_index++;
        this.showList = false;
    }

    prevItem() {
        this.hasClicked = true;
        this.list_index--;
        this.showList = false;
    }

    listItems() {
        this.showList = true;
        this.hasClicked = true;
    }
}

// ------------------- Roll_Container --------------------------

class Roll_Container {

    constructor(item_list, item_titles, base_sketch) {
        this.items = item_list;
        this.titles = item_titles;
        this.menu = add_footer_roll(this.items);
        this.opening_sketch = base_sketch;
        this.draw_sketch;
        this.index = -1;
        this.sketch_name = "none";
        this.text_links = [];
        this.make_list();
    }

    mseClicked() {
        for (var i = 0; i < this.text_links.length; i++) this.text_links[i].mseClicked();
    }

    update() {
        if (this.menu.has_clicked()) this.menu.update();
        if (this.menu.item_changed()) this.swap_functions();

        if (this.menu.has_clicked()) {
            try {
                this.draw_sketch = eval(this.sketch_name);
            } catch (err) {
                return;
            }
            if (this.menu.showList) this.show_list();
            this.draw_sketch();

        } else this.opening_sketch();
    }

    swap_functions() {
        this.index = this.menu.get_index();
        this.sketch_name = this.items[this.index];
        var new_script = this.sketch_name + ".js";
        try {
            eval(this.sketch_name);
            console.log("function is already loaded.");
        } catch (err) {
            try {
                this.load_function(new_script);
                console.log("trying to load function.");
            } catch (err) {
                console.log("could not load function.", err);
                return;
            }
        }
    }

    force_change(index) {
        this.menu.force_change(index);
        this.update();
    }

    load_function(url) {
        var head = document.head;
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        head.appendChild(script);
    }

    make_list() {
        for (var i = 0; i < this.items.length; i++) {
            var x = width / 2;
            var y = height / 2 + i * 30;
            var text_size = 20;
            this.text_links[i] = new Text_Link(this, this.titles[i], i, x, y, text_size);
        }
    }

    show_list() {
        this.draw_sketch = this.opening_sketch;
        for (var i = 0; i < this.text_links.length; i++) this.text_links[i].update();
    }

}

// ------------- Text_link ----------------------
// shows desired sketch when clicked

class Text_Link {

    constructor(parent_c, show_text, link_id, xpos, ypos, tsize) {
        this.parent = parent_c;
        this.x = xpos
        this.y = ypos;
        this.text = show_text;
        this.link = link_id;
        this.size = tsize;
        this.width = textWidth(this.text);
        this.height = tsize;
        this.overColor = color(0, 0, 255);
        this.xmin;
        this.xmax;
        this.ymin;
        this.ymax;
        textSize(this.size);
        this.myBounds();
    }

    update() {
        if (this.isOver()) fill(this.overColor);
        else fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.size);
        text(this.text, this.x, this.y);
    }

    myBounds() {
        this.xmin = this.x - this.width / 2;
        this.xmax = this.x + this.width / 2;
        this.ymin = this.y - this.height / 2;
        this.ymax = this.y + this.height / 2;
    }

    mseClicked() {
        if (this.isOver()) {
            this.parent.force_change(this.link);
        }
    }

    isOver() {
        if (mouseX > this.xmin && mouseX < this.xmax) {
            if (mouseY > this.ymin && mouseY < this.ymax) {
                return true;
            }
        }
        return false;
    }
}