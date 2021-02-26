class Proto_Page {

    constructor(n_sections, draw_functions) {
        this.sections = n_sections;
        this.articles = [];
        this.asides = [];
        this.psketch = [];
        this.draw = draw_functions;

        this.media_is_wide = window.matchMedia('(min-width: 576px)');
        this.media_is_wide.addEventListener('change', this.set_element_grid);

        this.create_sections();
        this.set_element_grid();
        this.add_sketches();
    }

    create_sections() {
        for (var i = 0; i < this.sections; i++) {

            // add an article and aside for all sections
            var new_element = createElement('aside');
            new_element.parent(select('.container'));
            this.asides.push(new_element);

            new_element = createElement('article');
            new_element.parent(select('.container'));
            this.articles.push(new_element);
        }

    }

    // bind this function to the Standard_Page object:
    set_element_grid = (function () {

        if (this.media_is_wide.matches) {
            // set css grid for large screens
            for (var i = 0; i < this.sections; i++) {
                this.asides[i].style('grid-row', 3 + i);
                this.articles[i].style('grid-row', 3 + i);

                this.asides[i].style('grid-column', '1');
                this.articles[i].style('grid-column', '2');
            }

            var elt = select('footer');
            elt.style('grid-row', 3 + this.sections);

        } else {
            // set css grid for small screens

            for (var i = 0; i < this.sections; i++) {
                this.asides[i].style('grid-row', 4 + 2 * i);
                this.articles[i].style('grid-row', 3 + i * 2);

                this.asides[i].style('grid-column', 'span 2');
                this.articles[i].style('grid-column', 'span 2');
            }

            var elt = select('footer');
            elt.style('grid-row', 3 + 2 * this.sections);
        }

    }).bind(this);

    add_sketches() {
        console.log("here we go!");
        for (var i = 0; i < this.sections; i++) {
            this.psketch[i] = new Proto_Sketch(this.articles[i].elt,this.draw[i]);
            
        }
        console.log("added the sketches", this.psketch[0].sketch);
    }

    add_header_image(img) {
        var header_img = createImg(img, 'logo');
        header_img.size(360, 65);
        header_img.parent('heads-up');
        return header_img;
    }

    add_footer_text(txt) {
        var f = select('#menu_down');
        f.style('display:grid');
        f.html(txt, true);
        return f;
    }

    add_aside_text(aside_id, text_add) {
        var sidetext = createDiv(text_add);
        sidetext.parent(this.asides[aside_id]);
    }

    add_asides_text(text_array) {
        for (var i=0; i<this.sections; i++) {
            var sidetext = createDiv(text_array[i]);
            sidetext.parent(this.asides[i]);
        }
    }

    set_draw_function(article_id,func) {
        this.psketch[article_id].set_draw_function(func);
    }

    resize() {
        for (var i = 0; i < this.sections; i++) {
            this.psketch[i].resize();
        }
    }
}

// -----------------------------------------------------------------

class Proto_Menu { // see Main_Menu extension below (silly, I know)
    constructor(labels, parentID, parentDir, btn_class, addHome) {

        this.labels = labels;
        this.parent_id = parentID;
        this.buttons = [];
        this.home_button;
        this.add_home = addHome;
        this.parent_dir = parentDir;
        this.button_class = btn_class;
        this.list_div;
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

// ------------------- Main_Menu --------------------------

class Main_Menu extends Proto_Menu {
    constructor() {
        super(["about", "projects", "week"], 'menu_up', "", "button", true);
    }
}

// ---------------------------------------------------------------------------

class Proto_Sketch {

    constructor(parent_elt, draw_function) {
        this.article = parent_elt;
        this.draw_loop = eval(draw_function);
        this.sketch_width=400;
        this.sketch_height=400;
        this.sketch_border=10;
        this.sketch;
        console.log("welp, I'm in here.", this.draw_loop);
        this.add_sketch();
    }

    add_sketch() {
        var self = this;
        let sketch_template = function (p) {

            p.setup = function () {
                p.resize();
                // p.draw_loop = self.draw_loop;
            }
            p.draw = function () {
                self.draw_loop(this);

                // safari on the iphone screws up unless this is in here (not necessary on other devices):
                if (self.article.offsetWidth != self.sketch_width + 2 * self.sketch_border) {
                    self.resize();
                }
            }
            p.resize = function () {
                var article = self.article;
                self.sketch_width = article.offsetWidth - 2 * self.sketch_border;
                self.sketch_height = article.offsetHeight - 2 * self.sketch_border;

                p.canv = p.createCanvas(self.sketch_width, self.sketch_height);
                p.canv.position(self.sketch_border, self.sketch_border);
            }
        };

        this.sketch = new p5(sketch_template, this.article);
        console.log("adding a sketch");
    }

    set_draw_function(func) {
        this.draw_loop = func;
    }

    set_opacity(op) {
        var opacity = op;
        if (opacity <= 1) opacity = 255*opacity;

        var c = this.sketch.background_color;
        this.sketch.background_color = color(red(c),green(c),blue(c),opacity);
    }

    resize() {
        this.sketch.resize();
    }

}