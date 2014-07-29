/**
 * @module app
 * @requires core
 * @requires router
 * @requires views/home
 */
define([
    'core',
    'router',
    'views/home'
],
function(core, Router, HomeView) {
    'use strict';

    var $ = core.$;

    /**
     * @exports app
     */
    var App = {

        /**
         * Has the application been initialised already?
         * @type {Boolean}
         */
        initialised: false,

        /**
         * The appliation config
         * @type {Config}
         */
        config: core.config,

        /**
         * The active View instance
         * @type {views.BaseView}
         */
        currentView: null,

        /**
         * The current Router instance
         * @type {Backbone.Router}
         */
        router: new Router(),

        /**
         * Initialises the application
         */
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

        /**
         * Event handler that responds to configuration changes
         * @private
         * @param  {Backbone.Events} evt
         */
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

        /**
         * Renders the active View
         */
        render: function() {
            this.currentView.render();
        },

        /**
         * Sets the active View
         * @param {String}   viewId   Path to the View module
         * @param {Function} callback Success callback
         * @param {Function} errback  Error callback
         */
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
                    function() {
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

        /**
         * Sets the current theme
         * @param {String} themeId The unique theme id
         */
        setTheme: function(themeId) {
            this.config.set('theme', themeId);
            this.render();
        }

    };

    // now initialise & return
    App.init();
    return App;
});
