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
  'bower install_.\nAfter that, run the build with _grunt_.';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [

    // prompt for values
    init.prompt('name')

  ], function(err, props) {

    props.description = 'grunt-init template for scaffolding a project for browser-based development',
    props.repository = 'https://github.com/dylansmith/grunt-init-browser',
    props.node_version = '>= 0.10.0';
    props.devDependencies = {
      "grunt": "~0.4.2",
      "grunt-autoprefixer": "^0.8.1",
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
      "grunt-docco": "^0.3.3",
      "grunt-jsdoc": "^0.5.6",
      "grunt-karma": "^0.8.3",
      "grunt-newer": "~0.7.0",
      "grunt-plato": "^1.1.0",
      "handlebars": "^1.3.0",
      "jshint-stylish": "~0.1.5",
      "karma": "^0.12.16",
      "karma-chrome-launcher": "^0.1.4",
      "karma-coverage": "^0.2.4",
      "karma-expect": "^1.1.0",
      "karma-mocha": "^0.1.4",
      "karma-mocha-reporter": "^0.2.6",
      "karma-nyan-reporter": "0.0.43",
      "karma-phantomjs-launcher": "^0.1.4",
      "karma-requirejs": "^0.2.2",
      "karma-safari-launcher": "^0.1.1",
      "karma-sinon-chai": "^0.2.0",
      "load-grunt-config": "^0.12.0",
      "load-grunt-tasks": "~0.4.0",
      "mocha": "*",
      "requirejs": "^2.1.14",
      "should": "*",
      "time-grunt": "~0.3.1"
    }

    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    init.writePackageJSON('package.json', props);
    done();

  });

};
