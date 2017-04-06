(function(window) {
    'use strict';

    var $ = window.jQuery;

    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://localhost:3002/coffeeorders';

    // import stuff from App namespace
    var App = window.App;
    var Truck = App.Truck;
    //var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    // create instances
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', remoteDS); // formerly new DataStore for local server
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    // create single submit handler that invokes both createOrder
    // and addRow
    formHandler.addSubmitHandler(function (data) {
        var defer = $.Deferred();
        $.get(SERVER_URL + '?emailAddress=' + data.emailAddress, function(serverResponse) {
            if (serverResponse.length != 0) {
                defer.reject();
                var message = 'Order already exists';
                document.getElementById('emailInput').setCustomValidity(message);
            } else {
                defer.resolve();
                return myTruck.createOrder.call(myTruck, data)
                    .then(function() {
                        checkList.addRow.call(checkList, data);
                    });
            }
        });
        return defer;
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    formHandler.decafHandler(Validation.isDecaf);

    myTruck.printOrders(checkList.addRow.bind(checkList));

    console.log(formHandler);
})(window);
