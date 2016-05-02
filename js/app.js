/* 
 Created on : 26-Apr-2016, 14:24:51
 Author     : Stefan Verweij
 Version    : 1.0.0
 */

/**
 * TODO: add create function and call using a function constructor. See
 * https://github.com/Sycoraxya/effective-dollop
 * 
 * var testimonialsTest = Object.create(Testimonials);
 * testimonialsTest.init($('.testimonial-wrapper'), 'testimonialsTest')
 * 
 * TODO: add different animation types, add styling templates for out-of-the-box use, resize only when it is actually necessary, next & back arrows
 * 
 * TODO: Make options with a readOptions() function and initialize like this: testimonials.init({wrapper: $('wrapper'), speed: 5000, navElement: $('nav')})
 * 
 * Maybe JS lib?
 */

var testimonials = {
    animationType: 'fade', // fade or slide (not yet implemented)
    speed: 5000, // time each testimonial is visible. Disables the timer if set to 0
    padding: 20, // Sets the padding on the top and bottom of the testimonials
    pauseOnHover: true, // Pauses the carousel on hover if set to true (warning: clears the timer)
    testimonialElements: [], // Object of all <section> elements in the wrapper.
    wrapperElement: '',
    $wrapperElement: [],
    currentSlide: 1,
    highest: 0,
    /**
     * Takes a jQuery element that is the wrapper for the carousel.
     * @param {jQuery element} wrapperElement
     */
    init: function (wrapperElement) {
        this.$wrapperElement = $(wrapperElement);
        this.wrapperElement = wrapperElement[0].className;
        this.getAllElements();       
        this.addNav();
        this.setActive(this.currentSlide);
        this.bindClicks();

        this.initInterval();
        this.onResize();
        if (this.pauseOnHover === true)
            this.clearOnHover();
    },
    getAllElements: function () {
        var elements = $('.' + this.wrapperElement + ' section');
        
        this.highest = this.getHighestTestimonial();
        
        // loop through all elements, create seperate objects from them and store them all in this.testimonialElements
        for (i = 0; i < elements.length; i++) {
            var testimonialElement = elements[i],
                $testimonialElement = $(testimonialElement);

            $testimonialElement.attr('data-index', (i + 1));

            testimonials.testimonialElements.push({
                element: elements[i],
            });
            this.centerVertically($testimonialElement.find('.quote'));
            
        }
        this.setContainerHeight();
    },
    addNav: function () {
        for (i = 1; i < (this.testimonialElements.length + 1); i++) {
            $('.' + this.wrapperElement + ' .navigation').append('<span class="nav-sphere" data-index="' + i + '"></span>');
        }
    },
    /**
     * Sets the passed slide number to active and updates the current slide
     * @param {number} slide
     */
    setActive: function (slide) {
        if ($('.' + this.wrapperElement + ' .active').length) {
            $('.' + this.wrapperElement + ' .active').removeClass('active');
        }
        $('section[data-index="' + slide + '"').addClass('active');
        $('.navigation span[data-index="' + slide + '"').addClass('active');
        this.currentSlide = slide;
    },
    bindClicks: function () {
        this.$wrapperElement.find('.navigation span').bind("click", function (e) {
            clearInterval(testimonials.testimonialsInterval);
            testimonials.animateTo(e.target);
        });
    },
    next: function () {
        if (this.currentSlide < this.testimonialElements.length) {
            this.setActive(Number(this.currentSlide) + 1);
        } else {
            this.setActive(1);
        }
    },
    /**
     * Animates to the passed HTML element's data-index number
     * @param {htmlElement} e
     */
    animateTo: function (e) {
        var index = $(e).attr('data-index');
        this.setActive(index);
        this.initInterval();
    },
    initInterval: function () {
        if (this.speed > 1) {
            this.testimonialsInterval = window.setInterval(function () {
                testimonials.next();
            }, this.speed);
        }
    },
    getHighestTestimonial: function () {
        var heights = $('.' + this.wrapperElement + ' .testimonial').map(function () {
            return $(this).outerHeight();
        }).get();
        
        return Math.max.apply(null, heights);
    },
    setContainerHeight: function () {
        this.highest = this.getHighestTestimonial();
        $('.' + this.wrapperElement + ' .container').css("height", (this.highest + this.padding));
        
        this.setHudOffset();
    },
    centerVertically: function (element) {
        if (element.attr('style') === undefined) {
            var center = Math.floor(((this.highest  + (this.padding * 2)) / 2) - (element.innerHeight() / 2));
            element.css("margin-top", center);
        } else {
            var center = Math.floor(($('.' + this.wrapperElement + ' .container').innerHeight() / 2) - (element.innerHeight() / 2));
            element.css("margin-top", center);
        }
    },
    setHudOffset: function () {
        var innerHeight = $('.' + this.wrapperElement + ' .container').innerHeight();
        
        $('.' + this.wrapperElement + ' .info').css("top", innerHeight);
    },
    clearOnHover: function () {
        $('.' + this.wrapperElement).bind({
            mouseover: function () { clearInterval(testimonials.testimonialsInterval);},
            mouseout: function () { 
                clearInterval(testimonials.testimonialsInterval); 
                testimonials.initInterval();
            },
        });
    },
    onResize: function () {
        $(window).bind('resize', function() {
            testimonials.highest = testimonials.getHighestTestimonial();
            console.log(testimonials.highest);
            testimonials.setContainerHeight();
            var elements = $('.' + testimonials.wrapperElement + ' section');
            for (i = 0; i < elements.length; i++) {
            var testimonialElement = elements[i],
                $testimonialElement = $(testimonialElement);
            testimonials.centerVertically($testimonialElement.find('.quote'));
            }
        });
    }
};