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
            expr: true  // using "should" requires expressions without assignment
        },
        src: ['test/**/*.spec.js']
    }
};
