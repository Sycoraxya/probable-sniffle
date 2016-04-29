# probable-sniffle
Testimonials carousel

## USAGE 

### HTML MARKUP

```html
<div class="testimonial-wrapper">
    <section class="testimonial">
        <span class="quote">
            There's always money in the banana stand!
        </span>
        <span class="info">
            <span class="image" style="background-image: url(img/oscar.jpg)"></span>
            <span class="inf-wrap">
                <span class="name">Oscar George Bluth</span> 
                <span class="company">Probike tweewielers</span>
            </span>
        </span>
    </section>
    <section class="testimonial">
        <span class="quote">
            You buy yourself a tape recorder, you just record yourself for a whole day. I think you’re going to be surprised at some of your phrasing.
        </span>
        <span class="info">
            <span class="image" style="background-image: url(img/michael.jpg)"></span>
            <span class="inf-wrap">
                <span class="name">Michael bluth</span> 
                <span class="company">The bluth company</span>
            </span>
        </span>
    </section>
    <section class="testimonial">
        <span class="quote">
            Marry me!
        </span>
        <span class="info">
            <span class="image" style="background-image: url(img/maeby.jpg)"></span>
            <span class="inf-wrap">
                <span class="name">Maeby Fünke</span> 
                <span class="company">Tantamount Studios</span>
            </span>
        </span>
    </section>
    <span class="navigation"></span>
</div>
```

### JAVASCRIPT

Drop the HTML somewhere in your document, add styling (you can use the style.css as a base) and call the script using:

```js
(function () {
    testimonials.init($('.testimonial-wrapper'));
})();
```

Or initialise it when the document is loaded:

```js
$(document).ready(function () {
    testimonials.init($('.testimonial-wrapper'));
}
```

## OPTIONS

### Interval speed

You can change the interval speed in app.js (standard 5 seconds). 
The interval can be disabled if the speed is set to 0.

```js
speed: 5000
```