'use strict';

/* see: https://github.com/karma-runner/grunt-karma */
module.exports = {
    options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: true
    },
    bdd: {
        singleRun: false
    },
    unit: {
        browsers: ['PhantomJS']
    },
    unit_all: {
        browsers: ['PhantomJS', 'Chrome', 'Safari']
    }
};
