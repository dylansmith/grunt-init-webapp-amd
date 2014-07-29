'use strict';

/* see: https://github.com/gruntjs/grunt-contrib-less */
module.exports = {
    options: {
        cleancss: false,          // Compress output using clean-css.
        compress: false,          // Compress output by removing some whitespaces,
        customFunctions: {},      // Define custom functions to be available within your LESS stylesheets.
        dumpLineNumbers: false,   // Configures -sass-debug-info support. Accepts following values: comments, mediaquery, all.
        ieCompat: true,           // Enforce the css output is compatible with Internet Explorer 8.
        modifyVars: {},           // Overrides global variables. Equivalent to --modify-vars='VAR=VALUE' option in less.
        optimization: null,       // Set the parser's optimization level. The lower the number, the less nodes it will create in the tree.
        outputSourceFiles: false, // Puts the less files into the map instead of referencing them.
        paths: ['src/styles/'],   // Specifies directories to scan for @import directives when parsing.
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
    build: {
        files: {
            'dist/css/app.css': 'src/styles/**/*.less'
        }
    },
};
