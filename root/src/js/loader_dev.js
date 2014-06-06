(function() {

    curl({
        baseUrl: 'js/',
        paths: {
            'bower': '../../bower_components/'
        },
        pluginPath: 'bower/curl/src/curl/plugin/',
        preloads: [
            'js!bower/jquery/dist/jquery.js'
        ]
    })
    .next(['app', 'domReady!'])
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
