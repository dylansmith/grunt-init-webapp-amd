module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('reporting', [
        'jsdoc',
        'docco',
        'plato'
    ]);

};
