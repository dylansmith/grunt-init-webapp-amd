curl({
    baseUrl: '',
    pluginPath: '../bower_components/curl/src/curl/plugin/',
    paths: {
        // libs
        'bootstrap': '../public/lib/bootstrap/bootstrap.min.js',
        'handlebars': '../bower_components/handlebars/handlebars.runtime.js',
        'jquery': '../bower_components/jquery/dist/jquery.js',
        // app
        'app': '../app',
        'css!': '../public/'
    },
    preloads: [
        'js!jquery',
    ]
})
.next([
    'js!handlebars',
    'js!bootstrap',
    'js!app/templates/compiled'
])
// all dependencies above should be built into public/js/core.js
// now load the app
.next([
    'app/app',
    'css!css/app.css',
    'domReady!'])
.then(function(app) {
    app.init();
});
