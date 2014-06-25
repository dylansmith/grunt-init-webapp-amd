define([
    'core',
    'router',
    'views/home',
    'views/(bundle)'
],
function(core, Router, HomeView) {
    'use strict';

    var App = {

        config: core.config,
        currentView: null,
        router: new Router(),
        templates: core.templates,

        init: function() {
            // set the environment
            var env = $('meta[name="application-env"').attr('content');
            if (env) {
                this.config.setenv(env);
            }

            // listen for config changes
            this.config.on('config:update', this.configObserver, this);

            // respond to routes
            this.router.on('route:home', _.bind(this.setView, this, 'home'));
            this.router.on('route:setView', _.bind(this.setView, this));
            this.router.on('route:setTheme', _.bind(this.setTheme, this));

            // set the default view
            this.currentView = new HomeView();

            // commence routing
            core.Backbone.history.start();
        },

        render: function() {
            this.currentView.render();
        },

        setView: function(viewId) {
            var app = this;
            try {
                require(
                    ['views/' + viewId],
                    function(View) {
                        app.currentView = new View();
                        app.currentView.render();
                    },
                    function(err) {
                        app.setView('404');
                    },
                    undefined,
                    // force syncronous require for prod environment running almond,
                    // otherwise we lose the callstack for try/catch due to setTimeout
                    (this.config.getenv() === 'prod')
                );
            }
            catch (err) {
                // prevent infinite recursion
                if (viewId !== '404') {
                    app.setView('404');
                }
            }
        },

        setTheme: function(themeId) {
            this.config.set('theme', themeId);
            this.render();
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

    // expose via the configured public namespace
    var namespace = App.config.get('js_namespace');
    if (namespace) {
        window[namespace] = App;
    }

    // now initialise & return
    App.init();
    return App;
});
