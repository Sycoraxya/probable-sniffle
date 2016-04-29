/* 
    Created on : 26-Apr-2016, 14:24:51
    Author     : Stefan Verweij
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
        
    },
    getAllElements: function () {
        var elements = $('.' + this.wrapperElement + ' section');
        
        // loop through all elements, create seperate objects from them and store them all in this.testimonialElements
        for (i = 0; i < elements.length; i++) {
            var testimonialElement = elements[i],
                $testimonialElement = $(testimonialElement);
            
            testimonials.testimonialElements.push({ 
                element: elements[i],
                info: this.getInfo($testimonialElement)
            });
            
            $testimonialElement.attr('data-index', (i +1)).find('.info').detach();
            this.addPerson(i);
            /**
             * TODO: add data-index to testimonials
             */
        }
    },
    getInfo: function (element) {
        return element.find('.info');
    },
    getImage: function (element) {
        return element.find('.image').css('backgroundImage').replace('url("', '').replace('")', '');
    },
    getName: function (element) {
        return element.find('.name').text().trim();
    },
    getCompany: function (element) {
        return element.find('.company').text().trim();
    },
    addPerson: function (index) {
        this.$wrapperElement.find('.persons').append((this.testimonialElements[index].info).attr('data-index', (index +1)));
    },
    addNav: function () {
        console.log('Adding ' + this.testimonialElements.length + ' navigation spheres...');
        for (i = 1; i < (this.testimonialElements.length + 1); i++) {
            $('.testimonial-wrapper .navigation').append('<span class="nav-sphere" data-index="' + i +'"></span>');
        }    
    },
    next: function () {
        
    },
    prev: function () {
        
    },
    animateTo: function () {
        
    }
};

(function () {
    testimonials.init($('.testimonial-wrapper'));
})();