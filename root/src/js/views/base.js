/**
 * @module views/base
 * @requires core
 */
define([
    'core'
],
function(core) {
    'use strict';

    /**
     * @namespace views
     * @class BaseView
     * @extends Backbone.View
     * @memberOf views
     */
    var BaseView = core.Backbone.View.extend(
    /** @lends views.BaseView.prototype */
    {
        /**
         * The DOM element managed by the View
         * @type {DOMElement}
         */
        el: core.config.get('container'),

        /**
         * The module path of the template to use when rendering
         * @type {String}
         */
        templateId: null,

        /**
         * Returns data representing the current state of the view
         * @return {Object}
         */
        getState: function() {
            return {
                config: core.config
            };
        },

        /**
         * Renders the View template into the managed element
         * @return {BaseView} (for chainability)
         */
        render: function() {
            var content = this.renderTemplate(this.getState());
            this.$el.html(content);
            return this;
        },

        /**
         * Executes the View template with the provided context object
         * @param  {Object} data The template context
         * @return {String}      The template output
         */
        renderTemplate: function(data) {
            return (this.templateId && core.templates[this.templateId]) ?
                core.templates[this.templateId](data) : '';
        }
    });

    return BaseView;
});
