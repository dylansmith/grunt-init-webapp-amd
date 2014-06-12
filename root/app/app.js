define([
    'core',
    'router',
    'views/home'
],
function(core, Router, HomeView) {

    var App = {

        config: core.config,
        currentView: null,
        router: new Router(),
        templates: core.templates,

        init: function() {
            // commence routing
            core.Backbone.history.start();

            // listen for global config changes
            core.config.on('config:update', this.configObserver, this);

            // load the home view
            this.currentView = new HomeView();
            this.render();
        },

        render: function() {
            this.currentView.render();
        },

        configObserver: function(evt) {
            var renderableKeys = ['theme'];
            // writes renderable config keys to the DOM as body attributes
            if (renderableKeys.indexOf(evt.key) >= 0) {
                if (!evt.newval) {
                    $('body').removeAttr('data-' + evt.key);
                }
                else {
                    $('body').attr('data-' + evt.key, evt.newval);
                }
            }
        }

    };

    return App;
});
