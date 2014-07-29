/**
 * @module config
 * @requires lodash
 * @requires Backbone
 */
define([
    'lodash',
    'backbone'
],
function(_, Backbone) {
    'use strict';

    var DEFAULTS = {
        // common/default configuration for all environments
        common: {
            name: 'App',
            container: '#main',
            js_namespace: 'app'
        },

        // dev environment overrides
        dev: {

        },

        // prod environment overrides
        prod: {

        }
    };

    /**
     * @class Config
     * @mixes Backbone.Events
     */
    function Config(env, vals) {
        this.init(env, vals);
    }

    Config.prototype = _.extend(
    /** @lends Config.prototype */
    {
        /**
         * Current environment name
         * @private
         * @type {String}
         */
        _env: 'dev',

        /**
         * Internal value store
         * @private
         * @type {Object}
         */
        _props: {},

        /**
         * Raw configuration map
         * @private
         * @type {Object}
         */
        _raw: {},

        /**
         * Initialise the configuration for a given environment
         * @param  {String} env  Environment name
         * @param  {Object} [vals] Map of properties and values to set
         * @return {config} (for chainability)
         */
        init: function(env, vals) {
            this._raw = _.assign({}, vals || DEFAULTS);
            this.setenv(env || this._env);
            return this;
        },

        /**
         * Returns the configured environment name
         * @return {String}
         */
        getenv: function() {
            return this._env;
        },

        /**
         * Sets the configured environment
         * @param  {String} env Environment name
         * @return {config} (for chainability)
         */
        setenv: function(env) {
            this._env = env;
            this._props = _.assign({}, this._raw.common || {}, this._raw[env] || {});
            return this;
        },

        /**
         * Returns a configuration value for the given property key
         * @param  {String} key Property key
         * @return {mixed}
         */
        get: function (key) {
            return this._props[key];
        },

        /**
         * Returns a map of all configuration properties and their values
         * @return {Object}
         */
        getAll: function() {
            return _.clone(this._props, true);
        },

        /**
         * Sets a configuration value for the given property key
         * @param {String} key Property key
         * @param {mixed}  val Property value
         * @return {config} (for chainability)
         */
        set: function (key, val) {
            var cfg = this,
                prev = this.get(key);

            this._props[key] = val;
            this.trigger('config:update', {
                key: key,
                oldval: prev,
                newval: val,
                config: cfg
            });
            return this;
        }
    },
    // mix in Backbone.Events
    Backbone.Events);

    // initialise for the dev environment
    var instance = new Config('dev');
    return instance;
});
