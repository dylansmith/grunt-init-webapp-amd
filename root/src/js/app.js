define([
    'core',
    'router',
    'views/home',
    'views/(bundle)'
],
function(core, Router, HomeView) {
    'use strict';

    var App = {

        initialised: false,
        config: core.config,
        currentView: null,
        router: new Router(),
        templates: core.templates,

        init: function() {
            // set the environment
            var env = $('meta[name="application-env"]').attr('content');
            if (env) {
                this.config.setenv(env);
            }

            // expose via the configured public namespace
            var ns = this.config.get('js_namespace');
            if (ns) {
                window[ns] = this;
            }

            if (this.initialised === false) {
                // listen for config changes
                this.config.on('config:update', this.configObserver, this);

                // respond to routes
                this.router.on('route:home', _.bind(this.setView, this, 'home'));
                this.router.on('route:setView', this.setView, this);
                this.router.on('route:setTheme', this.setTheme, this);
            }

            // set the default view
            this.currentView = new HomeView();

            // commence routing
            if (!core.Backbone.History.started) {
                core.Backbone.history.start();
            }

            this.initialised = true;
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
        },

        render: function() {
            this.currentView.render();
        },

        setView: function(viewId, callback, errback) {
            var app = this;
            try {
                require(
                    ['views/' + viewId],
                    function(View) {
                        app.currentView = new View();
                        app.currentView.render();
                        if (_.isFunction(callback)) {
                            callback(app.currentView);
                        }
                    },
                    function(err) {
                        app.setView('404', callback, errback);
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
                if (_.isFunction(errback)) {
                    errback();
                }
            }
        },

        setTheme: function(themeId) {
            this.config.set('theme', themeId);
            this.render();
        }

    };

    // now initialise & return
    App.init();
    return App;
});
