(function (window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@bignerdranch\.com$/.test(email);
        },

        isDecaf: function (myString, value) {
            if (myString.includes('decaf') && value > 20) {
                return false;
            }
            else {
                return true;
            }
        }
    };



    App.Validation = Validation;
    window.App = App;
})(window);
