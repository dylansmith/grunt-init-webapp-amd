(function() {

    curl({
        baseUrl: '',
        pluginPath: '../bower_components/curl/src/curl/plugin/',
        paths: {
            'jquery': '../bower_components/jquery/dist/jquery.js',
            'handlebars': '../bower_components/handlebars/handlebars.runtime.js',
            'templates': 'templates/compiled.js'
        },
        preloads: [
            'js!jquery',
            'js!handlebars',
            'js!templates'
        ]
    })
    .next(['js/app', 'domReady!'])
    .then(
        // success
        function(app) {
            app.init();

        },
        // failure
        function (err) {
            console.error('app could not start', err);
        }
    );

})();
