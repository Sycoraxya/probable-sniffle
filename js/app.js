/* 
 Created on : 26-Apr-2016, 14:24:51
 Author     : Stefan Verweij
 Version    : 0.2
 */

/**
 * TODO: add create function and call using a function constructor. See
 * https://github.com/Sycoraxya/effective-dollop
 * 
 * var testimonialsTest = Object.create(Testimonials);
 * testimonialsTest.init($('.testimonial-wrapper'), 'testimonialsTest')

 * TODO: make height calc more dynamic, disable interval on hover, add different animation types, add styling templates for out-of-the-box use
 * 
 * TODO: Make options with a readOptions() function and initialize like this: testimonials.init({wrapper: $('wrapper'), speed: 5000, navElement: $('nav')})
 */

var testimonials = {
    animationType: 'fade', // fade or slide (not yet implemented)
    speed: 5000, // time each testimonial is visible. Disables the timer if set to 0
    height: 100, // minimal height of all testimonial items
    maxHeight: 0,
    testimonialElements: [], // Object of all <section> elements in the wrapper. {element, text, image, name, company}
    wrapperElement: '',
    $wrapperElement: [],
    currentSlide: 1,
    testimonialsInterval: false,
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
    },
    getAllElements: function () {
        var elements = $('.' + this.wrapperElement + ' section');
        
        this.setTestimonialHeight();
        // loop through all elements, create seperate objects from them and store them all in this.testimonialElements
        for (i = 0; i < elements.length; i++) {
            var testimonialElement = elements[i],
                $testimonialElement = $(testimonialElement);

            $testimonialElement.attr('data-index', (i + 1));

            testimonials.testimonialElements.push({
                element: elements[i],
                quoteHeight: $testimonialElement.find('.quote').innerHeight()
            });
            this.centerVertically($testimonialElement.find('.quote'));
            
        }
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
    setTestimonialHeight: function () {
        // Get height of highest testimonial, set the height of all the testimonials to that value and vertically center the text
        this.maxHeight = this.getHighestTestimonial();
        $('.' + this.wrapperElement + ' .testimonial').css("height", this.maxHeight);
        this.setInfoTopOffset();
        this.setNavigationMargin();
    },
    getHighestTestimonial: function () {
        var heights = $('.' + this.wrapperElement + ' .testimonial').map(function () {
            return $(this).height();
        }).get();
        
        return Math.max.apply(null, heights);
    },
    centerVertically: function (element) {
        var center = Math.floor((this.height / 2) - (element.innerHeight() / 2));
        element.css("padding-top", center);
    },
    setInfoTopoffset: function () {
        $('.' + this.wrapperElement + ' .info').css("top", (this.height - 10));
    },
    setNavigationMargin: function () {
        $('.' + this.wrapperElement + ' .navigation').css("margin-top", (this.height + 10));
    }
};