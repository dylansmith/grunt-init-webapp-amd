module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('test', [
        'jshint:test',
        'karma:unit'
    ]);

    grunt.registerTask('test:all', [
        'jshint:test',
        'karma:unit_all'
    ]);

};
