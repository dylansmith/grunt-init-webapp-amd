'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-copy */
module.exports = {
    libs: {
        files: [
            // bootstrap
            { src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'dist/lib/bootstrap', expand: true, flatten: true },
            { src: 'bower_components/bootstrap/dist/css/bootstrap.css.map', dest: 'dist/lib/bootstrap', expand: true, flatten: true },
            { src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'dist/lib/bootstrap/fonts', expand: true, flatten: true },
            // requirejs
            { src: 'bower_components/requirejs/require.js', dest: 'dist/lib', expand: true, flatten: true }
        ]
  }
};
