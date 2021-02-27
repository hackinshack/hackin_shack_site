class Looper_Page extends Proto_Page {

    constructor(function_list, link_labels) {
        super(1, function_list);
        this.main_menu = new Main_Menu();
        this.header_image = this.add_header_image('/docs/images/logo_side_4.png');

        this.items = function_list;
        this.titles = link_labels;
        this.looper_roll = new Looper_Roll(this.items);
        this.looper_links = this.make_looper_links();

        this.sketch = this.psketch[0].sketch;
        this.function_name = this.items[0];
        this.draw_sketch = eval(this.function_name);

        this.loaded_functions = [this.items[0]];
        this.fresh_load = true;
    }

    mseClicked() {
        for (var i = 0; i < this.looper_links.length; i++) this.looper_links[i].mseClicked(this.sketch);
    }

    update() {

        // this.looper_roll.update();

        // doing this to avoid figuring out how to use async functions.
        // it will just skip the draw loop until the next is loaded and recognized,
        // rather than wait for a promise to be fulfilled.
        // something to grow on.

        // if (typeof this.items[this.index] === "function") console.log("yes its a function");
        // else console.log("not a function");

        // if (eval(this.function_name)) console.log("yes its a function");
        // else console.log("not a function");

        // console.log("start update",this.function_name);


        this.draw_sketch(this.fresh_load);
        this.fresh_load = false;

        if (this.looper_roll.item_changed()) {
            this.fresh_load = true;
            var ind = this.looper_roll.get_index();
            var new_function = this.items[ind];

            if (this.loaded_functions.includes(new_function)) {
                this.draw_sketch = eval(new_function);
                return;
            }
            
            this.load_function(new_function);
            this.fresh_load = true;
            this.loaded_functions.push(new_function);
        }
        else {
            this.fresh_load = false;
        }


        // try {
        //     // console.log(this.function_name);
        //     this.draw_sketch = eval(this.function_name);
        // } catch (err) {
        //     console.log("we have no function");
        //     return;
        // }

        // if (this.looper_roll.item_changed()) {
        //     console.log("before swap",this.draw_sketch);
        //     this.swap_functions();
        //     console.log("after swap",this.draw_sketch);
        //     this.fresh_load = true;
        // } else {
        //     this.draw_sketch(this.fresh_load);
        //     this.fresh_load = false;
        // }
    }

    // swappy = new Promise((resolve, reject) => {
    //     if (somethingSuccesfulHappened) {
    //         const successObject = {
    //             msg: 'Success',
    //             data, //...some data we got back
    //         }
    //         resolve(successObject);
    //     } else {
    //         const errorObject = {
    //             msg: 'An error occured',
    //             error, //...some error we got back
    //         }
    //         reject(errorObject);
    //     }
    // });

    async switch_to_function(new_fn) {

        await this.load_function(new_fn);

        return;

        //  .then((fn) => this.draw_sketch = eval(fn));


        // return new Promise((resolve, reject) => {
        //     resolve(this.load_function(new_fn));
        // });

        // return new Promise((resolve, reject) => {
        //     var fn = this.load_function(new_fn);
        //     resolve(fn);
        // });

        // this.index = this.looper_roll.get_index();
        // this.function_name = this.items[this.index];

        // try {
        //     this.draw_sketch = eval(this.function_name);
        //     console.log("function is already loaded.", this.function_name);
        // } catch {
        //     this.load_function(this.function_name).then(whatever => {
        //             console.log("swaperoo");
        //         }

        //     );
        //     console.log("loading new sketch", this.function_name);
        // }
    }

    swap_functions() {
        this.index = this.looper_roll.get_index();
        this.function_name = this.items[this.index];

        try {
            this.draw_sketch = eval(this.function_name);
            console.log("function is already loaded.", this.function_name);
        } catch {
            this.load_function(this.function_name);
            console.log("loading new sketch", this.function_name);
        }
    }

    force_change(index) {
        this.looper_roll.force_change(index);
        // this.update();
    }

    load_function(func_name) {
        var self = this;
        console.log("attempting to load function ", func_name);
        var url = func_name + ".js";
        var head = document.head;
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        head.appendChild(script);
        script.addEventListener("load", (event) => {
            console.log('script loaded');
            self.draw_sketch = eval(func_name);

          });
        // script.addEventListener("load", scriptLoaded);

        // function scriptLoaded() {
        //     console.log("got the new function");
        //     this.draw_sketch = eval(func_name);
        //     this.fresh_load = true;
        // }

        // return func_name;
    }

    make_looper_links() {
        var x_offset = 60;
        var y_offset = 30;
        var vert_spacer = 30;
        var text_size = 18;
        var links = [];

        for (var i = 0; i < this.items.length; i++) {
            var x = x_offset;
            var y = y_offset + i * vert_spacer;
            links[i] = new Looper_Link(this, this.titles[i], i, x, y, text_size);
        }

        return links;
    }

    show_links_list() {
        for (var i = 1; i < this.looper_links.length; i++) this.looper_links[i].show(this.sketch);
    }

    add_link(url, label, x, y) {
        var link = createA(url, label);
        link.parent(select('article'));
        link.position(x, y);
    }

    clear_links() {
        // remove all links from article:
        var a = selectAll('a', '#article');
        for (var i = 0; i < a.length; i++) {
            a[i].remove();
        }
    }

}

// ---------------------------------------------

class Looper_Roll {

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

    item_changed() {
        if (this.list_index != this.last_index) {
            this.last_index = this.list_index;
            return true;
        } else return false;
    }

    force_change(index) {
        this.last_index = this.list_index;
        this.list_index = index;
        // this.last_index = -1;
    }

    get_index() {
        return this.list_index;
    }

    nextItem() {
        this.last_index = this.list_index;
        this.list_index++;
        if (this.list_index > this.items.length - 1) {
            this.list_index = 0;
        }
    }

    prevItem() {
        this.last_index = this.list_index;
        this.list_index--;
        if (this.list_index < 0) {
            this.list_index = this.items.length - 1;
        }
    }

    listItems() {
        this.force_change(0);
    }
}

// -----------------------------------

class Looper_Link {

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

    show(sketch) {

        var underline_offset = 1;
        if (this.isOver(sketch)) {
            sketch.fill(this.overColor);
            sketch.stroke(this.overColor);
        } else {
            sketch.fill(255);
            sketch.stroke(255);
        }

        sketch.textAlign(LEFT, TOP);
        sketch.textSize(this.size);
        sketch.text(this.text, this.x, this.y);
        sketch.line(this.xmin, this.ymax + underline_offset, this.xmax, this.ymax + underline_offset);
    }

    myBounds() {
        this.xmin = this.x;
        this.xmax = this.x + this.width;
        this.ymin = this.y;
        this.ymax = this.y + this.height;
    }

    mseClicked(sketch) {
        if (this.isOver(sketch)) {
            this.parent.force_change(this.link);
        }
    }

    isOver(sketch) {
        if (sketch.mouseX > this.xmin && sketch.mouseX < this.xmax) {
            if (sketch.mouseY > this.ymin && sketch.mouseY < this.ymax) {
                return true;
            }
        }
        return false;
    }
}