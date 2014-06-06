(function() {

    curl({
        baseUrl: 'js/',
        preloads: []
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
