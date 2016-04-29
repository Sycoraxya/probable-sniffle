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
    init: function (wrapperElement) {
        this.$wrapperElement = $(wrapperElement);
        this.wrapperElement = wrapperElement[0].className;
        this.getAllElements();
        console.log(this.testimonialElements);
        this.addNav();
        this.setActive(this.currentSlide);
        this.bindClicks();
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
        console.log('Adding ' + this.testimonialElements.length + ' navigation spheres...');
        for (i = 1; i < (this.testimonialElements.length + 1); i++) {
            $('.' + this.wrapperElement + ' .navigation').append('<span class="nav-sphere" data-index="' + i + '"></span>');
        }
    },
    setActive: function (slide) {
        if ($('.' + this.wrapperElement + ' .active').length) {
            $('.' + this.wrapperElement + ' .active').removeClass('active');
        }
        $('section[data-index="' + slide + '"').addClass('active');
        $('.navigation span[data-index="' + slide + '"').addClass('active');
    },
    bindClicks: function () {
        this.$wrapperElement.find('.navigation span').bind("click", function (e) {
            testimonials.animateTo(e.target);
        });
    },
    next: function () {

    },
    prev: function () {

    },
    animateTo: function (e) {
        var index = $(e).attr('data-index');
        this.setActive(index);
    }
};

(function () {
    testimonials.init($('.testimonial-wrapper'));
})();