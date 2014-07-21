'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-jshint */
module.exports = {
    options: {
        reporter: require('jshint-stylish')
    },
    gruntfile: {
        src: 'Gruntfile.js'
    },
    src: {
        src: ['src/js/**/*.js', '!src/js/**/(bundle).js']
    },
    test: {
        options: {
            // using "should" requires expressions without assignment
            expr: true
        },
        src: ['test/**/*.spec.js']
    }
};
