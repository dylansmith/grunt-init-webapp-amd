/**
 * @module views/config
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
     * @class ConfigView
     * @extends views.BaseView
     * @memberOf views
     * @requires core
     * @requires views/base
     */
    var ConfigView = BaseView.extend(
    /** @lends views.ConfigView.prototype */
    {
        /**
         * The module path of the template to use when rendering
         * @type {String}
         */
        templateId: 'config',

        /**
         * Returns data representing the current state of the view
         * @return {Object}
         */
        getState: function() {
            return core.config;
        }
    });

    return ConfigView;
});
