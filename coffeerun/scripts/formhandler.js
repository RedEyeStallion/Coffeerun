(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        // find a matching element in DOM using selector and assign to
        // this.$formElement
        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        // accepts the name of the event and a callback to run when event triggered
        this.$formElement.on('submit', function(event) {
            // ensures submitting form does not take user away from CoffeeRun page
            event.preventDefault();

            // gets the values from the form and returns form data as array of objects
            // $(this) gives you a wrapped jQuery object
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            //console.log(this.data['strength']);
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };
    // trying to get value of slider
    FormHandler.prototype.sliderColorHandler = function() {
        var strength = document.getElementById('strengthLevel');
        strength.addEventListener('input', function(event){
            event.preventDefault();

            console.log(strength.value);

            //$(strength.value).html('');
            //get value of slider
            //var value = document.getElementByID('strengthLevel').value;
            //console.log(value);
        });
    };

    // this is calling a constructor function
    App.FormHandler = FormHandler;
    // export constructor to window.App
    window.App = App;

})(window);
