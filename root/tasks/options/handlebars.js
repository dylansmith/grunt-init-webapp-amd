'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-handlebars */
module.exports = {
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
          return filePath.replace('src/templates/', '').replace(/\.hbs$/i, '');
        }
    },
    build: {
        files: {
          'build/templates/templates.js': ['src/templates/**/*.hbs']
        }
    }
};
