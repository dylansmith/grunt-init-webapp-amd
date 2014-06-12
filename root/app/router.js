define([
    'core'
], function (core) {
    'use strict';

    var Router = core.Backbone.Router.extend({
        routes: {
            'theme/:id': 'index'
        },

        index: function(themeId) {
            core.config.set('theme', themeId);
        }

    });

    return Router;

});
