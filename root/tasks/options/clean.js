'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-clean */
module.exports = {
    build: {
        src: [
            'build/docs',
            'build/styles',
            'build/templates'
            // exclude build/reports as they may update over time (e.g. plato)
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
