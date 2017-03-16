(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    // call FormHandler constructor, passing it FORM_SELECTOR
    var formHandler = new FormHandler(FORM_SELECTOR);

    // call addSubmitHandler
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    console.log(formHandler);
})(window);
