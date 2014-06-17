define([
    'underscore',
    'jquery',
    'modernizr',
    'bootstrap',
    'backbone',
    'handlebars',
    'templates',
    'config'
],
function(_) {
    return _.zipObject([
        '_',
        '$',
        'Modernizr',
        'bootstrap',
        'Backbone',
        'Handlebars',
        'templates',
        'config'
    ], arguments);
});
