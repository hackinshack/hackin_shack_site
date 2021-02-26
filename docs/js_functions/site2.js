// ------------------- Roll_Container --------------------------

class Roll_Container {

    constructor(item_list, item_titles, proto_sketch) {
        this.items = item_list;
        this.titles = item_titles;
        this.menu = add_footer_roll(this.items);
        this.sketch = proto_sketch.sketch;
        this.function_name = this.items[0];
        this.draw_sketch = eval(this.function_name);
        this.index = -1;
        this.footer_links = [];
        this.fresh_load = true;
        this.make_list();
    }

    mseClicked() {
        for (var i = 0; i < this.footer_links.length; i++) this.footer_links[i].mseClicked();
    }

    update() {

        this.menu.update();

        // doing this to avoid figuring out how to use async functions.
        // it will just skip the draw loop until the next is loaded and recognized,
        // rather than wait for a promise to be fulfilled.
        // something to grow on.
        try {
            this.draw_sketch = eval(this.function_name);
        } catch (err) {
            return;
        }

        if (this.menu.item_changed()) {
            this.swap_functions();
            this.fresh_load = true;
        } else {
            this.draw_sketch(this.fresh_load, this.sketch);
            this.fresh_load = false;
        }
    }

    swap_functions() {
        this.index = this.menu.get_index();
        this.function_name = this.items[this.index];

        try {
            this.draw_sketch = eval(this.function_name);
            // console.log("function is already loaded.", this.function_name);
        } catch {
            this.load_function(this.function_name);
            // console.log("loading new sketch");
        }
    }

    force_change(index) {
        this.menu.force_change(index);
        this.update();
    }

    load_function(func_name) {
        var url = func_name + ".js";
        var head = document.head;
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        head.appendChild(script);
    }

    make_list() {

        var x_offset = 60;
        var y_offset = 30;
        var vert_spacer = 30;
        var text_size = 18;

        for (var i = 0; i < this.items.length; i++) {
            var x = x_offset;
            var y = y_offset + i * vert_spacer;
            this.footer_links[i] = new Footer_Link(this, this.titles[i], i, x, y, text_size);
        }
    }

    show_list() {
        this.draw_sketch = this.opening_sketch;
        for (var i = 1; i < this.footer_links.length; i++) this.footer_links[i].show();
    }

}

// ------------------- Footer_Roll --------------------------
class Footer_Roll {

    constructor(item_list) {
        this.items = item_list;
        this.list_index = 0;
        this.last_index = 0;
        this.parent_id = "menu_down";
        this.create();
    }

    create() {
        // add menu items:
        this.nextButton = createButton(">");
        this.nextButton.parent(this.parent_id);
        this.nextButton.style('float', 'right');
        this.nextButton.class('footer-button');
        this.nextButton.mousePressed(this.nextItem.bind(this));

        // this.listButton = createButton("list");
        this.listButton = createButton("O");
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
        this.last_index = -1;
    }

    get_index() {
        return this.list_index;
    }

    nextItem() {
        this.list_index++;
    }

    prevItem() {
        this.list_index--;
    }

    listItems() {
        this.force_change(0);
    }
}

// ------------- Footer_link ----------------------
// shows desired sketch when clicked based on footer_roll items

class Footer_Link {

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

    show() {
        var underline_offset = 1;
        if (this.isOver()) {
            fill(this.overColor);
            stroke(this.overColor);
        } else {
            fill(255);
            stroke(255);
        }

        textAlign(LEFT, TOP);
        textSize(this.size);
        text(this.text, this.x, this.y);
        line(this.xmin, this.ymax + underline_offset, this.xmax, this.ymax + underline_offset);
    }

    myBounds() {
        this.xmin = this.x;
        this.xmax = this.x + this.width;
        this.ymin = this.y;
        this.ymax = this.y + this.height;
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