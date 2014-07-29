'use strict';

var grunt = require('grunt'),
    _ = require('lodash'),
    jshintrc;

// get jshintrc, strip comments and parse to JSON
jshintrc = grunt.file.read('./.jshintrc', {encoding: 'utf8'});
jshintrc = JSON.parse(jshintrc.replace(/\/\/.*$/igm, ''));

/* see: https://github.com/gruntjs/grunt-contrib-jshint */
module.exports = {
    options: {
        reporter: require('jshint-stylish')
    },
    gruntfile: {
        options: _.assign(jshintrc, {
            node: true
        }),
        src: 'Gruntfile.js'
    },
    src: {
        options: {
            jshintrc: true
        },
        src: ['src/js/**/*.js', '!src/js/**/(bundle).js']
    },
    test: {
        options: _.assign(jshintrc, {
            expr: true,
            globals: {
                'sinon': true
            },
            '-W024': true
        }),
        src: ['test/**/*.spec.js']
    }
};
