'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-concat */
module.exports = {
    options: {
        stripBanners: true
    },
    css: {
        src: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'build/css/app.css'
        ],
        dest: 'dist/css/app.css'
    }
};
