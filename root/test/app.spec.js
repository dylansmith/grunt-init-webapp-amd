define(function(require) {

    describe('App', function() {

        var app = require('app'),
            _ = require('../bower_components/lodash/dist/lodash');

        it('should have an #init method', function() {
            expect(_.isFunction(app.init)).toEqual(true);
        });

        it('should have an #render method', function() {
            expect(_.isFunction(app.render)).toEqual(true);
        });

        it('should have a #config property', function() {
            expect(_.isObject(app.config)).toEqual(true);
        });

        it('should have a #templates property', function() {
            expect(_.isObject(app.templates)).toEqual(true);
        });

        define('#render', function() {

            beforeEach(function() {
                app.init();
                app.render();
            });

            it('should exist as a method', function() {
                expect(_.isFunction(app.render)).toEqual(true);
            });

            it('should update the page title', function() {
                var title = app.config.get('name');
                expect(title).toBeDefined();
                expect(document.title).toEqual(title);
            });
        });

    });

});
