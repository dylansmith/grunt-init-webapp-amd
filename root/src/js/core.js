/**
 * @module core
 * @requires lodash
 * @requires jquery
 * @requires modernizr
 * @requires bootstrap
 * @requires backbone
 * @requires handlebars
 * @requires bundles/templates
 * @requires bundles/views
 * @requires config
 */
define([
    'lodash',
    'jquery',
    'modernizr',
    'bootstrap',
    'backbone',
    'handlebars',
    '../bundles/templates',
    '../bundles/views',
    'config'
],
function(_) {
    'use strict';
    return _.zipObject([
        '_',
        '$',
        'Modernizr',
        'bootstrap',
        'Backbone',
        'Handlebars',
        'templates',
        'views',
        'config'
    ], arguments);
});
