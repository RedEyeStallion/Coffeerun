(function (window) {
    'use strict';
    // import App namespace
    var App = window.App || {};
    // import jQuery
    var $ = window.jQuery;

    // constructor, url is a remote server URL
    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
    }

    // store customer order data on the remote web service, key not used but kept
    // so this method is identical to add method of DataStore
    RemoteDataStore.prototype.add = function (key, val) {
        // $.post() sends a POST request, triggers callback when server responds
        return $.post(this.serverUrl, val, function (serverResponse) {
            console.log(serverResponse);
        });
    };

    // retrieve all orders from the server
    RemoteDataStore.prototype.getAll = function (cb) {
        // $.get() retrieves info from server, triggers callback when server responds
        return $.get(this.serverUrl, function (serverResponse) {
            // check for possibility of no callback
            if(cb){
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    // retrieve a single order from the server
    RemoteDataStore.prototype.get = function (key, cb) {
        return $.get(this.serverUrl + '/' + key, function (serverResponse) {
            if(cb){
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    // delete an order from the server, key = email address
    RemoteDataStore.prototype.remove = function (key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };
    /*
    RemoteDataStore.prototype.remove = function (key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };
    */

    // export RemoteDataStore to App namespace
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
