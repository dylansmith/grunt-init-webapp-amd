module.exports = function(grunt) {
    'use strict';

    // custom task to generate requirejs loaders based on the requirejs:compile Grunt task
    grunt.registerTask('generate:loaders', 'Generates the requirejs dev & test loaders', function() {
        var opts = require('./options/requirejs').dist.options,
            conf = {
                baseUrl: '../src/js',
                paths: opts.paths,
                shim: opts.shim
            },
            testfiles = /\.spec\.js$/;

        grunt.file.write('dist/js/loader.js', [
            '// DO NOT EDIT - this file is automatically generated by running grunt generate:loaders',
            'require.config(' + JSON.stringify(conf) + '); require([\'app\']);'
        ].join('\n'));

        conf.baseUrl = '/base/src/js';
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

        grunt.file.recurse('src/js/views', function(abspath, rootdir, subdir, filename) {
            filename = filename.split('.').slice(0,-1).join('.');
            var path = (subdir) ? ['views', subdir, filename] : ['views', filename];
            if (filename !== '(bundle)') modules.push(path.join('/'));
        });

        grunt.file.write('src/js/views/(bundle).js', [
            '// DO NOT EDIT - this file is automatically generated by running grunt generate:viewbundle',
            'require([\n"' + modules.join('",\n"') + '"\n]);'
        ].join('\n'));
    });

};
