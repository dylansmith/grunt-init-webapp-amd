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

exports.after = 'You should now install project dependencies with _npm install_ ' +
  'and _bower install_. After that, you may execute project tasks with _grunt_.';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    
    // prompt for values
    init.prompt('name')

  ], function(err, props) {
    
    props.lib_dir = 'src';
    props.test_dir = 'test';
    props.node_version = '>= 0.10.0';
    props.devDependencies = {
      "grunt": "~0.4.2",
      "grunt-contrib-jshint": "~0.10.0",
      "grunt-contrib-clean": "~0.5.0",
      "grunt-contrib-concat": "~0.4.0",
      "grunt-contrib-copy":   "~0.5.0",
      "grunt-contrib-uglify": "~0.4.0",
      "grunt-contrib-watch":  "~0.6.0",
      "grunt-browserify": "~2.1.0",
      "grunt-newer": "~0.7.0",
      "load-grunt-tasks": "~0.4.0",
      "time-grunt": "~0.3.1",
      "jshint-stylish": "~0.1.5",
      "should": "*",
      "mocha": "*",
      "grunt-mocha-istanbul": "*",
      "jquery": "~1.11.0",
      "lodash": "~2.4.0",
      "handlebars": "~2.0.0"
    }

    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    init.writePackageJSON('package.json', props);
    done();

  });

};
