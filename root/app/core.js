define([
    'jquery',
    'underscore',
    'bootstrap',
    'backbone',
    'handlebars',
    'templates',
    'config'
],
function($, _, undefined, Backbone, Handlebars, templates, config) {
    return {
        '$': $,
        'Backbone': Backbone,
        'Handlebars': Handlebars,
        'templates': templates,
        'config': config
    };
});
