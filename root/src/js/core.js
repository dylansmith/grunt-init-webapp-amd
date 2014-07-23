/**
 * @module core
 * @requires lodash
 * @requires jquery
 * @requires modernizr
 * @requires bootstrap
 * @requires backbone
 * @requires handlebars
 * @requires templates
 * @requires config
 */
define([
    'lodash',
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
