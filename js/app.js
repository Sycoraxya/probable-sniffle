/* 
 Created on : 26-Apr-2016, 14:24:51
 Author     : Stefan Verweij
 */

/**
 * TODO: add create function and call using a function constructor. See
 * https://github.com/Sycoraxya/effective-dollop
 * 
 * var testimonialsTest = Object.create(Testimonials);
 * testimonialsTest.init($('.testimonial-wrapper'), 'testimonialsTest')
 */

var testimonials = {
    animationType: 'fade', // fade or slide
    speed: 5000, // time each testimonial is visible
    testimonialElements: [], // Object of all <section> elements in the wrapper. {element, text, image, name, company}
    wrapperElement: '',
    $wrapperElement: [],
    currentSlide: 1,
    testimonialsInterval: false,
    /**
     * Takes a jQuery element that is the wrapper for carousel.
     * @param {type} wrapperElement
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

        // loop through all elements, create seperate objects from them and store them all in this.testimonialElements
        for (i = 0; i < elements.length; i++) {
            var testimonialElement = elements[i],
                $testimonialElement = $(testimonialElement);

            $testimonialElement.attr('data-index', (i + 1));

            testimonials.testimonialElements.push({
                element: elements[i],
            });
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
        this.testimonialsInterval = window.setInterval(function () {
            testimonials.next();
        }, this.speed);
    }
};

(function () {
    testimonials.init($('.testimonial-wrapper'));
})();