class Standard_Page {

    constructor(n_sections, draw_functions) {
        this.sections = n_sections;
        this.articles = [];
        this.asides = [];
        this.buffers = [];
        this.sketch = [];
        this.draw = draw_functions;

        this.sketchDiv;
        this.sketch_width = 400; 
        this.sketch_height = 400;
        this.sketch_border = 10;

        this.main_menu_labels = ["about", "projects", "week"];
        this.main_menu = new Main_Menu(this.main_menu_labels, 'menu_up');
        this.header_image = this.add_header_image();
        this.add_footer_text();

        this.media_is_wide = window.matchMedia('(min-width: 576px)');
        this.media_is_wide.addEventListener('change', this.set_element_grid);
        // window.addEventListener('orientationchange',this.resize);

        this.create_sections();
        this.set_element_grid();
        this.add_sketches();
    }

    create_sections() {
        for (var i = 0; i < this.sections; i++) {
            // add an article and aside section for all secions

            var id_text = 'id = side' + (i + 1);
            var new_element = createElement('aside', id_text);
            new_element.parent(select('.container'));
            this.asides.push(new_element);

            id_text = 'id = sketch' + (i + 1);
            new_element = createElement('article', id_text);
            new_element.parent(select('.container'));
            this.articles.push(new_element);
        }

        this.sketchDiv = this.articles[0].elt;
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

        var self = this;
        let sketch = function (p) {
            
            p.setup = function () {
                p.resize();
                p.draw_loop = self.draw_loop;
            }
            p.draw = function () {
                p.draw_loop(this);

                // safari on the iphone screws up unless this is in here (not necessary on other devices):
                if (self.articles[0].elt.offsetWidth != self.sketch_width + 2 * self.sketch_border) {
                    self.resize();
                }
            }
            p.resize = function () {
                var article = self.articles[0].elt;
                self.sketch_width = article.offsetWidth - 2 * self.sketch_border;
                self.sketch_height = article.offsetHeight - 2 * self.sketch_border;

                p.canv = p.createCanvas(self.sketch_width, self.sketch_height);
                p.canv.position(self.sketch_border, self.sketch_border);
              }
        };

        for (var i = 0; i < this.sections; i++) {
            this.draw_loop = this.draw[i];
            this.sketch[i] = new p5(sketch, this.articles[i].elt);
        }

    }

    add_header_image() {
        var header_img = createImg('/docs/images/logo_side_4.png', 'logo');
        header_img.size(360, 65);
        header_img.parent('heads-up');
        return header_img;
    }

    add_footer_text() {
        var f = select('#menu_down');
        f.style('display:grid');
        f.html('Let&#39s make something.', true);
        return f;
    }

    resize() {
        for (var i = 0; i < this.sections; i++) {
            this.sketch[i].resize();
        }
    }
}