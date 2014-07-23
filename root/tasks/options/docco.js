'use strict';

module.exports = {
    debug: {
        src: ['<%= jshint.src.src %>', '<%= jshint.test.src %>'],
        options: {
            output: 'build/docs/docco'
        }
    }
};
