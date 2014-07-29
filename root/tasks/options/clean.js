'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-clean */
module.exports = {
    build: {
        src: [
            'build/docs',
            'build/instrument',
            'build/reports/coverage',
            // exclude build/reports/plato as they update over time
            'build/styles',
            'build/templates'
        ]
    },
    dist: {
        src: [
            'dist/css/**/*.*',
            'dist/js/**/*.*',
            'dist/lib/!(.gitignore)'
        ]
    },
    grunt: {
        src: ['.grunt']
    }
};
