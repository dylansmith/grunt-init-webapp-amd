define(function(require) {
    'use strict';

    describe('BaseView', function() {

        var BaseView = require('views/base'),
            core = require('core'),
            $ = require('jquery'),
            view,
            container;

        beforeEach(function() {
            // create a mock compiled template
            core.templates.BaseViewTest = function() {
                return 'foobar';
            };

            // create an empty render container
            container = (!container) ?
                $('<div/>').attr('id', 'testContainer').appendTo('body') :
                container.empty();

            // create the view instance
            view = new BaseView({el: '#testContainer'});
            view.templateId = 'BaseViewTest';
        });

        it('should extend Backbone.View', function() {
            view.should.be.an.instanceOf(core.Backbone.View);
        });

        describe('#render', function() {

            it('should return the view instance for sugar', function() {
                view.render().should.equal(view);
            });

            it('should populate the container with the template output', function() {
                container.html().should.equal('');
                view.render();
                container.html().should.equal(view.renderTemplate());
            });

        });

        describe('#renderTemplate', function() {

            it('should return an empty string if no valid template is defined', function() {
                view.templateId = null;
                view.renderTemplate().should.equal('');
            });

            it('should return the rendered template output if a valid template is defined', function() {
                view.renderTemplate().should.equal(core.templates.BaseViewTest());
            });

        });

    });

});
