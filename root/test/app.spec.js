define(function(require) {

    describe('App', function() {

        var app = require('app'),
            _ = require('lodash');

        it('should auto-initialise', function() {
            app.initialised.should.be.true;
        });

        it('should have an #init method', function() {
            _.isFunction(app.init).should.be.true;
        });

        it('should have an #render method', function() {
            _.isFunction(app.render).should.be.true;
        });

        it('should have a #config property', function() {
            _.isObject(app.config).should.be.true;
        });

        it('should have a #templates property', function() {
            _.isObject(app.templates).should.be.true;
        });

        describe('#init', function() {

            it('should attempt to set the environment based on a meta element', function() {
                app.config.getenv().should.not.equal('prod');
                $('meta').attr({
                    name: 'application-env',
                    content: 'prod'
                }).appendTo('head');
                app.init();
                app.config.getenv().should.equal('prod');
                app.config.setenv('dev');
            });

            it('should initially render the HomeView', function() {
                var HomeView = require('views/home');
                app.currentView.constructor.should.equal(HomeView);
            });

        });

        describe('#render', function() {
            var spy;

            it('should render the currentView', function() {
                app.currentView.should.be.ok;
                spy = sinon.spy(app.currentView, 'render');
                app.render();
                spy.calledOnce.should.be.true;
            });

        });

        describe('#setTheme', function() {
            var testTheme = 'mono';

            beforeEach(function() {
                app.setTheme('');
            });

            it('should update the config', function() {
                app.config.get('theme').should.not.equal(testTheme);
                app.setTheme('mono');
                app.config.get('theme').should.equal(testTheme);
            });

            it('should update the body attribute', function() {
                app.setTheme(testTheme);
                $('body').attr('data-theme').should.equal(testTheme);
            });

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
