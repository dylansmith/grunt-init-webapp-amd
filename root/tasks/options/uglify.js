'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-uglify */
module.exports = {
    tmpl: {
        files: {
            'build/templates/templates.min.js': ['build/templates/templates.js']
        }
    }
};
