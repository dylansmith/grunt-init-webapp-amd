'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-concat */
module.exports = {
    css: {
        src: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'build/styles/**/*.css'
        ],
        dest: 'dist/css/app.css'
    }
};
