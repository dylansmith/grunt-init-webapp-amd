'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-clean */
module.exports = {
    build: {
        src: ['build']
    },
    dist: {
        src: [
            'dist/css/**/*.*',
            'dist/js/**/*.*',
            'dist/lib/!(.gitignore)',

        ]
    }
};
