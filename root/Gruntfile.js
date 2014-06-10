/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // auto-load grunt tasks & time execution
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /* see: https://www.npmjs.org/package/grunt-browserify */
    // browserify: {
    //   options: {},
    //   dist: {
    //     src: 'src/js/**/*.js',
    //     dest: 'dist/js/build.js'
    //   }
    // },

    /* see: https://github.com/gruntjs/grunt-contrib-clean */
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'public/css/*',
            'public/js/*',
            '!.gitignore'
          ]
        }]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-concat */
    concat: {
      options: {
        stripBanners: true
      },
      js: {
        files: {
          // core libs including the module loader
          'public/js/core.js': [
            'bower_components/curl/dist/curl-kitchen-sink/curl.js',
            'bower_components/handlebars/handlebars.runtime.min.js',
            'app/templates/compiled.min.js',
            'config/loader_prod.js'
          ],
          'public/js/app.js': [
            'app/app.js'
          ]
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-copy */
    copy: {
      // bootstrap resources
      bootstrap: {
        files: [
          { src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'public/lib/bootstrap', expand: true, flatten: true },
          { src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'public/lib/bootstrap', expand: true, flatten: true },
          { src: 'bower_components/bootstrap/dist/css/bootstrap.css.map', dest: 'public/lib/bootstrap', expand: true, flatten: true },
          { src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'public/lib/bootstrap/fonts', expand: true, flatten: true }
        ]
      },
      // jquery with source map support
      jquery: {
        files: [
          { src: ['bower_components/jquery/dist/jquery.*.*'], dest: 'public/lib/jquery', expand: true, flatten: true }
        ]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-handlebars */
    handlebars: {
      options: {
        amd: false,
        namespace: 'JST',
        processName: function(filePath) {
          return filePath.replace('app/templates/', '').replace(/\.hbs$/i, '');
        },
        processPartialName: function(filePath) {
          return filePath.replace('app/templates/', '').replace(/\.hbs$/i, '');
        }
      },
      templates: {
        files: {
          'app/templates/compiled.js': ['app/templates/**/*.hbs']
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-jshint */
    jshint: {
      options: { /* use .jshintrc instead */ },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/**/*.js', 'config/**/*.js', '!app/templates/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-less */
    less: {
      development: {
        options: {
          paths: ['less/']
        },
        files: {
          'public/css/app.css': 'less/app.less'
        }
      },
    },

    /* see: https://www.npmjs.org/package/grunt-mocha-istanbul */
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          mask: '*.spec.js',
          reporter: 'spec'  // dot, spec, nyan, tap, landing, list, progress
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-sass */
    // sass: {
    //   dist: {
    //     options: {
    //       trace: true,
    //       unixNewlines: true,
    //       style: 'nested',    // nested, compact, compressed, expanded
    //       lineNumbers: true,
    //     },
    //     files: {
    //       'public/css/app.css': ['sass/app.scss']
    //     }
    //   }
    // },

    /* see: https://github.com/gruntjs/grunt-contrib-uglify */
    uglify: {
      options: {
      },
      templates: {
        files: {
          'app/templates/compiled.min.js': ['app/templates/compiled.js']
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-watch */
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app']
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'less:development'
      },
      templates: {
        files: 'app/templates/**/*.hbs',
        tasks: ['handlebars:templates']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'test']
      }
    }

  });

  // tasks
  grunt.registerTask('test', [
    'mocha_istanbul:coverage'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'handlebars:templates',
    'uglify:templates',
    'less',
    'concat',
    'copy'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
