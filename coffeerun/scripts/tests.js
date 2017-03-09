QUnit.test('test adding datastore objects', function(assert) {
    assert.expect(1);
    var App = window.App || {};
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    });
});

QUnit.test('testing truck', function(assert) {
    assert.expect(1);

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;

    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    myTruck.printOrders();
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    assert.deepEqual(myTruck.printO(), {
        'me@goldfinger.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinger.com'
        }
    });
});
