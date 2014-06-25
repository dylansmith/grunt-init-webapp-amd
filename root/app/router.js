define([
    'core'
], function (core) {
    'use strict';

    var Router = core.Backbone.Router.extend({
        routes: {
            ''          : 'home',
            'home'      : 'home',
            'view/:id'  : 'setView',
            'theme/:id' : 'setTheme'
        }
    });

    return Router;

});
