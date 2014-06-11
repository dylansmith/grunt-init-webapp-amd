require.config({
    baseUrl: '../app/',
    paths: {
        'backbone'  : '../bower_components/backbone/backbone',
        'bootstrap' : '../public/lib/bootstrap/bootstrap.min',
        'handlebars': '../bower_components/handlebars/handlebars.runtime',
        'jquery'    : '../bower_components/jquery/dist/jquery',
        'lodash'    : '../bower_components/lodash/dist/lodash',
        'underscore': '../bower_components/lodash/dist/lodash',
        'templates' : '../.tmp/templates',
        'config'    : '../config/config',
    },
    // expose non-AMD libraries as modules
    shim: {
        'bootstrap' : [ 'jquery' ],
        'handlebars': { exports: 'Handlebars' },
        'jquery'    : { exports: '$' },
        'underscore': { exports: '_' }
    }
});

require(['app'], function(app) {
    app.init();
});
