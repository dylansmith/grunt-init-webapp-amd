module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('build:css', [
        'less',
        'concat:css',
        'autoprefixer:dist',
    ]);

    grunt.registerTask('build:js', [
        'generate:loaders',
        'generate:viewbundle',
        'jshint:src',
        'requirejs',
        'copy:libs'
    ]);

    grunt.registerTask('build:tmpl', [
        'handlebars',
        'uglify:tmpl',
        'generate:viewbundle',
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
