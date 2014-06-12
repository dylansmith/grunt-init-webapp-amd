/*
 * grunt-init-browser
 * https://github.com/dylansmith/grunt-init-browser
 *
 * Copyright (c) 2014 Dylan Smith
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Scaffolds a project for browser-based development';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

exports.after = 'Now install project dependencies with _npm install && ' +
  'bower install_. After that, run the build with _grunt_.';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [

    // prompt for values
    init.prompt('name')

  ], function(err, props) {

    props.description = 'grunt-init template for scaffolding a project for browser-based development',
    props.private = 'true',
    props.repository = 'https://github.com/dylansmith/grunt-init-browser',
    props.lib_dir = 'src';
    props.test_dir = 'test';
    props.node_version = '>= 0.10.0';
    props.devDependencies = {
      "grunt": "~0.4.2",
      "grunt-contrib-clean": "~0.5.0",
      "grunt-contrib-concat": "~0.4.0",
      "grunt-contrib-connect": "~0.8.0",
      "grunt-contrib-copy": "~0.5.0",
      "grunt-contrib-handlebars": "~0.8.0",
      "grunt-contrib-imagemin": "~0.7.1",
      "grunt-contrib-jshint": "~0.10.0",
      "grunt-contrib-less": "~0.11.1",
      "grunt-contrib-requirejs": "^0.4.4",
      "grunt-contrib-uglify": "~0.4.0",
      "grunt-contrib-watch": "~0.6.0",
      "grunt-mocha-istanbul": "*",
      "grunt-newer": "~0.7.0",
      "jshint-stylish": "~0.1.5",
      "load-grunt-tasks": "~0.4.0",
      "mocha": "*",
      "should": "*",
      "time-grunt": "~0.3.1"
    }

    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    init.writePackageJSON('package.json', props);
    done();

  });

};
