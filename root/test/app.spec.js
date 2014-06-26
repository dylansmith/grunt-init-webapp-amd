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

        it('should initially render the HomeView', function() {
            var HomeView = require('views/home');
            app.currentView.constructor.should.eql(HomeView);
        });

        describe('#setView (valid)', function() {

            beforeEach(function(done) {
                app.setView('home', function() {
                    done();
                });
            });

            it('should set app.currentView to a valid view instance', function(done) {
                var ConfigView = require('views/config');
                app.currentView.constructor.should.not.equal(ConfigView);
                app.setView('config', function() {
                    app.currentView.constructor.should.equal(ConfigView);
                    done();
                });
            });

            it('should set fallback to 404 if the viewId is invalid', function(done) {
                var NotFoundView = require('views/404');
                app.currentView.constructor.should.not.equal(NotFoundView);
                app.setView('NONEXISTANT', function() {
                    app.currentView.constructor.should.equal(NotFoundView);
                    done();
                });
            });

        });

    });

});
