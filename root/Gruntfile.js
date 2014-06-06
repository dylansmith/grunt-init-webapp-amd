/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    /* see: https://www.npmjs.org/package/grunt-browserify */
    browserify: {
      options: {},
      dist: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/app.js'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/js/**/*.js'],
        dest: 'dist/js/**/*.js'
      }
    },

    jshint: {
      options: { /* use .jshintrc instead */ },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/js/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    /* see: https://www.npmjs.org/package/grunt-mocha-istanbul */
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          mask: '*.spec.js',
          // reporters: dot, spec, nyan, tap, landing, list, progress
          reporter: 'spec'
        }
      }
    },

    uglify: {
      options: {
        //banner: '<%= banner %>'
      },
      dist: {
        src: '<%= browserify.dist.dest %>',
        dest: 'dist/js/app.min.js'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'test']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-browserify');

  // tasks
  grunt.registerTask('test', ['mocha_istanbul:coverage']);
  grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);

};
