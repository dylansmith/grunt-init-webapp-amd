'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-concat */
module.exports = {
    css: {
        src: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'dist/css/app.css'
        ],
        dest: 'dist/css/app.css'
    }
};
