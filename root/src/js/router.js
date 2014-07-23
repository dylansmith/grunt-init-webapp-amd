/**
 * @module router
 * @requires core
 */
define([
    'core'
], function (core) {
    'use strict';

    /**
     * @exports router
     * @extends Backbone.Router
     */
    var router = core.Backbone.Router.extend({
        routes: {
            ''          : 'home',
            'home'      : 'home',
            'view/:id'  : 'setView',
            'theme/:id' : 'setTheme'
        }
    });

    return router;

});
