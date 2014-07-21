'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-watch */
module.exports = {
    gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
    },
    js: {
        files: '<%= jshint.src.src %>',
        tasks: ['build:js']
    },
    css: {
        files: 'src/styles/**/*.less',
        tasks: ['build:css']
    },
    tmpl: {
        files: 'src/templates/**/*.hbs',
        tasks: ['build:tmpl']
    },
    test: {
        files: '<%= jshint.test.src %>',
        tasks: ['test']
    }
};
