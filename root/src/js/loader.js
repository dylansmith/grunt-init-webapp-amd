(function() {

    curl({
        baseUrl: '',
        preloads: []
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
