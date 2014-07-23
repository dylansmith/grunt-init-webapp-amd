/*global module:false*/
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // task configuration is in /tasks/options/*.js
    var config = require('load-grunt-config')(grunt, {
        configPath: require('path').join(process.cwd(), 'tasks', 'options'),
        postProcess: function(config) {
            config.pkg = grunt.file.readJSON('package.json');
        }
    });

    // tasks are defined in tasks/*.js
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['build', 'test', 'reporting']);
    grunt.initConfig(config);

};
