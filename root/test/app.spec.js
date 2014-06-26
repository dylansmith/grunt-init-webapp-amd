define(function(require) {

    describe('App', function() {

        var app = require('app'),
            _ = require('lodash');

        it('should have an #init method', function() {
            _.isFunction(app.init).should.eql(true);
        });

        it('should have an #render method', function() {
            _.isFunction(app.render).should.eql(true);
        });

        it('should have a #config property', function() {
            _.isObject(app.config).should.eql(true);
        });

        it('should have a #templates property', function() {
            _.isObject(app.templates).should.eql(true);
        });

        describe('#setView', function() {

            it('should set app.currentView to the view instance', function() {
                //app.setView('home');


            });

        });

    });

});
