curl({
    baseUrl: '',
    preloads: [
        'js!lib/jquery/jquery.min.js'
    ]
})
.next([
    'js/app',
    'css!css/app.css',
    'domReady!'
])
.then(function(app) {
    app.init();
});
