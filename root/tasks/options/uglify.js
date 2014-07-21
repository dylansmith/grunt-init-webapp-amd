'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-uglify */
module.exports = {
    tmpl: {
        files: {
            'build/templates.min.js': ['build/templates.js']
        }
    }
};
