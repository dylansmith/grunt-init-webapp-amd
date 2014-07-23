'use strict';

/** see: https://www.npmjs.org/package/grunt-plato */
module.exports = {
    options: {
        jshint: false
    },
    src: {
        files: {
            'build/reports/plato/src': ['<%= jshint.src.src %>']
        }
    },
    test: {
        files: {
            'build/reports/plato/test': ['<%= jshint.test.src %>']
        }
    }
};
