'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-imagemin */
module.exports = {
    options: {
        interlaced: true,       // Interlace GIF for progressive rendering.
        optimizationLevel: 3,   // Select PNG optimization level between 0 and 7.
        progressive: true,      // Lossless PNG conversion to progressive.
        use: null               // Additional plugins to use with imagemin. [Array]
    },
    dist: {
        files: [{
            cwd: 'dist/img/',           // Src matches are relative to this path
            dest: 'dist/img/',          // Destination path prefix
            expand: true,               // Enable dynamic expansion
            src: ['**/*.{png,jpg,gif}'] // Actual patterns to match
        }]
    }
};
