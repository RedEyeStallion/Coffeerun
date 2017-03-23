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

    // fn is a function being passed in
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

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.decafHandler = function(fn) {
        var word = '';
        this.$formElement.on('input', '[name="coffee"]', function(event) {

            word = event.target.value;
            var value = document.getElementById('strengthLevel').value;
            var message = '';

            if (fn(word, value)) {
                console.log('valid');
                event.target.setCustomValidity('');
                $('input[name="strength"]')[0].setCustomValidity('');
            } else {
                console.log('not valid');
                message = word + ' is not decaf';
                event.target.setCustomValidity(message);
            }
        });

        this.$formElement.on('input', '[name="strength"]', function(event) {
            //var word = document.getElementById('coffee').text;

            var value = event.target.value;
            var message = '';

            if (fn(word, value)) {
                console.log('valid');
                event.target.setCustomValidity('');
                $('input[name="coffee"]')[0].setCustomValidity('');
            } else {
                console.log('not valid');
                message = word + ' is not decaf';
                event.target.setCustomValidity(message);
            }
        });

    };
    // get value of slider and print to console
    /*
    FormHandler.prototype.sliderColorHandler = function() {
        var strength = document.getElementById('strengthLevel');
        strength.addEventListener('input', function(event){
            event.preventDefault();

            console.log(strength.value);
        });
    };
    */

    // this is calling a constructor function
    App.FormHandler = FormHandler;
    // export constructor to window.App
    window.App = App;

})(window);
