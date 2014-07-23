/**
 * @module views/404
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
     * @class NotFoundView
     * @extends views.BaseView
     * @memberOf views
     */
    var NotFoundView = BaseView.extend(
    /** @lends views.NotFoundView.prototype */
    {
        /**
         * The module path of the template to use when rendering
         * @type {String}
         */
        templateId: '404'
    });

    return NotFoundView;
});
