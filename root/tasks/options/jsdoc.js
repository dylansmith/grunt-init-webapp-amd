'use strict';

/* see: https://github.com/krampstudio/grunt-jsdoc */
module.exports = {
    build: {
        src: ['<%= jshint.src.src %>', '<%= jshint.test.src %>'],
        dest: 'build/docs/jsdoc'
    }
};
