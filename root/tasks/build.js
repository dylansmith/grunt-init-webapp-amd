module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('build:css', [
        'less',
        'concat:css',
        'autoprefixer',
    ]);

    grunt.registerTask('build:js', [
        'bundle:views',
        'generate:loaders',
        'jshint:src',
        'requirejs',
        'copy:libs'
    ]);

    grunt.registerTask('build:tmpl', [
        'bundle:templates',
        'bundle:views',
        'requirejs'
    ]);

    grunt.registerTask('build', [
        'clean',
        'build:tmpl',
        'build:js',
        'build:css',
        'newer:imagemin'
    ]);

};
