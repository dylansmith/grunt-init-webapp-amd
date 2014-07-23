/**
 * @module views/home
 * @requires core
 * @requires view/base
 */
define([
    'core',
    'views/base'
],
function(core, BaseView) {
    'use strict';

    /**
     * @class HomeView
     * @extends views.BaseView
     * @memberOf views
     */
    var HomeView = BaseView.extend(
    /** @lends views.HomeView.prototype */
    {
        /**
         * The module path of the template to use when rendering
         * @type {String}
         */
        templateId: 'home',

        /**
         * Returns data representing the current state of the view
         * @return {Object}
         */
        getState: function() {
            return {
                config: JSON.stringify(core.config.vals)
            };
        }
    });

    return HomeView;
});
