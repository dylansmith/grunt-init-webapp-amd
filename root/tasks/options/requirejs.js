'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-requirejs */
module.exports = {
    dist: {
        options: {
            baseUrl: 'src/js/',
            paths: {
                'backbone'  : '../../bower_components/backbone/backbone',
                'bootstrap' : '../../bower_components/bootstrap/dist/js/bootstrap.min',
                'handlebars': '../../bower_components/handlebars/handlebars.runtime',
                'jquery'    : '../../bower_components/jquery/dist/jquery',
                'lodash'    : '../../bower_components/lodash/dist/lodash',
                'modernizr' : '../../bower_components/modernizr/modernizr',
                'underscore': '../../bower_components/underscore/underscore'
            },
            shim: {
                'bootstrap' : [ 'jquery' ],
                'handlebars': { exports: 'Handlebars' },
                'jquery'    : { exports: '$' },
                'modernizr' : { exports: 'Modernizr' }
            },
            name: '../../bower_components/almond/almond',
            include: 'app',
            out: 'dist/js/app.js',
            insertRequire: ['app'],
            // extras (see: https://github.com/jrburke/r.js/blob/master/build/example.build.js)
            preserveLicenseComments: false,
            uglify: {
                max_line_length: 1000
            }
        }
    }
};
