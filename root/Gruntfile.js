/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // auto-load grunt tasks & time execution
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // task configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /* see https://github.com/nDmitry/grunt-autoprefixer */
    autoprefixer: {
      options: {},
      append: {
        src: '.tmp/css/*.css'
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-clean */
    clean: {
      all: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'public/*.*',
            'public/css/*.*',
            'public/js/*.*',
            'public/lib/*',
            '!**/.gitignore',
            '!public/index.*.html'
          ]
        }]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-concat */
    concat: {
      options: {
        stripBanners: true
      },
      css: {
        files: {
          'public/css/app.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            '.tmp/css/app.css'
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
          { src: 'bower_components/bootstrap/dist/css/bootstrap.css.map', dest: 'public/lib/bootstrap', expand: true, flatten: true },
          { src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'public/lib/bootstrap/fonts', expand: true, flatten: true }
        ]
      },
      // jquery.min + source map
      jquery: {
        files: [
          { src: ['bower_components/jquery/dist/jquery.*.*'], dest: 'public/lib/jquery', expand: true, flatten: true }
        ]
      },
      // requirejs
      requirejs: {
        files: [
          { src: 'bower_components/requirejs/require.js', dest: 'public/lib', expand: true, flatten: true }
        ]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-handlebars */
    handlebars: {
      options: {
        amd: true,                      // Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.
        commonjs: false,                // Wraps the output file in a CommonJS module function, exporting the compiled templates. It will also add templates to the template namespace, unless namespace is explicitly set to false.
        compilerOptions: {},            // This option allows you to specify a hash of options which will be passed directly to the Handlebars compiler.
        namespace: 'App.templates',     // The namespace in which the precompiled templates will be assigned.
        node: false,                    // Enable the compiled file to be required on node.js by preppending and appending proper declarations.
        partialRegex: /^_/,             // This option accepts a regex that defines the prefix character that is used to identify Handlebars partial files.
        partialsPathRegex: /./,         // This option accepts a regex that defines the path to a directory of Handlebars partials files.
        partialsUseNamespace: false,    // When set to true, partials will be registered in the namespace in addition to templates.
        wrapped: true,                  // Determine if preprocessed template functions will be wrapped in Handlebars.template function.
        /*-- processing callbacks --*/
        // processAST:          function(ast) {},
        // processContent:      function(content, filepath) {},
        // processPartialName:  function(filePath) {}
        processName: function(filePath) {
          // This option accepts a function which takes one argument (the template filepath)
          // and returns a string which will be used as the key for the precompiled template object.
          return filePath.replace('app/templates/', '').replace(/\.hbs$/i, '');
        }
      },
      templates: {
        files: {
          '.tmp/templates.js': ['app/templates/**/*.hbs']
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-imagemin */
    imagemin: {
      options: {
        interlaced: true,       // Interlace GIF for progressive rendering.
        optimizationLevel: 3,   // Select PNG optimization level between 0 and 7.
        progressive: true,      // Lossless PNG conversion to progressive.
        use: null               // Additional plugins to use with imagemin. [Array]
      },
      all: {
        files: [{
          cwd: 'public/img/',           // Src matches are relative to this path
          dest: 'public/img/',          // Destination path prefix
          expand: true,                 // Enable dynamic expansion
          src: ['**/*.{png,jpg,gif}']   // Actual patterns to match
        }]
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-jshint */
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: [
          'app/**/*.js',
          'config/**/*.js',
          '!app/**/(bundle).js'
        ]
      },
      test: {
        options: {
          // using "should" requires expressions without assignment
          expr: true
        },
        src: ['test/**/*.spec.js']
      }
    },

    /* see: https://github.com/karma-runner/grunt-karma */
    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999
      },
      bdd: {
        browsers: ['PhantomJS'],
        singleRun: false
      },
      unit: {
        singleRun: true
      },
      unit_all: {
        browsers: ['PhantomJS', 'Chrome', 'Safari'],
        singleRun: true
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-less */
    less: {
      options: {
        cleancss: false,          // Compress output using clean-css.
        compress: false,          // Compress output by removing some whitespaces,
        customFunctions: {},      // Define custom functions to be available within your LESS stylesheets.
        dumpLineNumbers: false,   // Configures -sass-debug-info support. Accepts following values: comments, mediaquery, all.
        ieCompat: true,           // Enforce the css output is compatible with Internet Explorer 8.
        modifyVars: {},           // Overrides global variables. Equivalent to --modify-vars='VAR=VALUE' option in less.
        optimization: null,       // Set the parser's optimization level. The lower the number, the less nodes it will create in the tree.
        outputSourceFiles: false, // Puts the less files into the map instead of referencing them.
        paths: ['less/'],         // Specifies directories to scan for @import directives when parsing.
        relativeUrls: false,      // Rewrite urls to be relative.
        report: 'min',            // Report minification [min] or minification+gzip [gzip] results.
        rootpath: '',             // A path to add on to the start of every url resource.
        sourceMap: false,         // Enable source maps.
        sourceMapBasepath: '',    // Sets the base path for the less file paths in the source map.
        sourceMapFilename: '',    // Write the source map to a separate file with the given filename.
        sourceMapRootpath: '',    // Adds this path onto the less file paths in the source map.
        sourceMapURL: '',         // Override the default url that points to the sourcemap from the compiled css file.
        strictImports: false,     // Force evaluation of imports.
        strictMath: false,        // When enabled, math is required to be in parenthesis.
        strictUnits: false,       // When enabled, less will validate the units used (e.g. 4px/2px = 2, not 2px and 4em/2px throws an error).
        syncImport: false         // Read @import'ed files synchronously from disk.
      },
      all: {
        files: {
          '.tmp/css/app.css': 'less/app.less'
        }
      },
    },

    /* see: https://github.com/gruntjs/grunt-contrib-requirejs */
    requirejs: {
      compile: {
        options: {
          baseUrl: 'app/',
          paths: {
              'backbone'  : '../bower_components/backbone/backbone',
              'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
              'handlebars': '../bower_components/handlebars/handlebars.runtime',
              'jquery'    : '../bower_components/jquery/dist/jquery',
              'lodash'    : '../bower_components/lodash/dist/lodash',
              'modernizr' : '../bower_components/modernizr/modernizr',
              'underscore': '../bower_components/underscore/underscore',
              'templates' : '../.tmp/templates',
              'config'    : '../config/config'
          },
          shim: {
              'bootstrap' : [ 'jquery' ],
              'handlebars': { exports: 'Handlebars' },
              'jquery'    : { exports: '$' },
              'modernizr' : { exports: 'Modernizr' }
          },
          name: '../bower_components/almond/almond',
          include: 'app',
          out: 'public/js/app.js',
          insertRequire: ['app'],
          // extras (see: https://github.com/jrburke/r.js/blob/master/build/example.build.js)
          preserveLicenseComments: false,
          uglify: {
            max_line_length: 1000
          }
        }
      }
    },

    /* see: https://github.com/gruntjs/grunt-contrib-uglify */
    uglify: {
      options: {
      },
      templates: {
        files: {
          '.tmp/templates.min.js': ['.tmp/templates.js']
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
        tasks: ['build:js']
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['build:css']
      },
      templates: {
        files: 'app/templates/**/*.hbs',
        tasks: ['build:tmpl']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['test']
      }
    }

  });

  // custom task to generate requirejs loaders based on the requirejs:compile Grunt task
  grunt.registerTask('generate:loaders', 'Generates the requirejs dev & test loaders', function() {
    var opts = grunt.config('requirejs.compile.options'),
        conf = {
          baseUrl: '../app/',
          paths: opts.paths,
          shim: opts.shim
        },
        testfiles = /\.spec\.js$/;

    grunt.file.write('public/js/loader.js', [
      '// DO NOT EDIT - this file is automatically generated by running grunt generate:loaders',
      'require.config(' + JSON.stringify(conf) + '); require([\'app\']);'
    ].join('\n'));

    conf.baseUrl = '/base/app/';
    grunt.file.write('test/loader.js', [
      '// DO NOT EDIT - this file is automatically generated by running grunt generate:loaders',
      '(function() {',
      '  var tests = [], conf = ' + JSON.stringify(conf) + ';',
      '  for (var file in window.__karma__.files) {',
      '    if (' + testfiles + '.test(file)) tests.push(file);',
      '  }',
      '  conf.deps = tests;',
      '  conf.callback = window.__karma__.start;',
      '  require.config(conf);',
      '})();'
    ].join('\n'));
  });

  // custom task to generate a bundled view module
  grunt.registerTask('generate:viewbundle', 'Generates a bundled view module', function() {
    var modules = [];

    grunt.file.recurse('app/views', function(abspath, rootdir, subdir, filename) {
      filename = filename.split('.').slice(0,-1).join('.');
      var path = (subdir) ? ['views', subdir, filename] : ['views', filename];
      if (filename !== '(bundle)') modules.push(path.join('/'));
    });

    grunt.file.write('app/views/(bundle).js', [
      '// DO NOT EDIT - this file is automatically generated by running grunt generate:viewbundle',
      'require([\n"' + modules.join('",\n"') + '"\n]);'
    ].join('\n'));
  });

  // tasks
  grunt.registerTask('test', [
    'jshint:test',
    'karma:unit'
  ]);

  grunt.registerTask('build:css', [
    'less',
    'autoprefixer:append',
    'concat:css'
  ]);

  grunt.registerTask('build:js', [
    'generate:loaders',
    'generate:viewbundle',
    'jshint:app',
    'requirejs',
    'copy'
  ]);

  grunt.registerTask('build:tmpl', [
    'handlebars',
    'uglify:templates',
    'requirejs'
  ]);

  grunt.registerTask('build', [
    'clean:all',
    'build:tmpl',
    'build:js',
    'build:css',
    'newer:imagemin',
  ]);

  grunt.registerTask('default', [
    'build',
    'test'
  ]);

};
