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

    var __CONFIG = {
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
     * @exports config
     * @mixes Backbone.Events
     */
    var config = {

        /**
         * Internal value store
         * @private
         * @type {Object}
         */
        vals: {},

        /**
         * Current environment name
         * @private
         * @type {String}
         */
        env: 'dev',

        /**
         * Initialise the configuration for a given environment
         * @param  {Object} vals Map of properties and values to set
         * @param  {String} env  Environment name
         * @return {config}      (for chainability)
         */
        init: function(vals, env) {
            if (_.isObject(vals)) {
                __CONFIG = vals;
            }
            this.setenv(env || this.env);
            return this;
        },

        /**
         * Returns the configured environment name
         * @return {String}
         */
        getenv: function() {
            return this.env;
        },

        /**
         * Sets the configured environment
         * @param  {String} val Environment name
         * @return {config}      (for chainability)
         */
        setenv: function(val) {
            this.env = val;
            this.vals = _.assign({}, __CONFIG.common, __CONFIG[val] || {});
            return this;
        },

        /**
         * Returns a configuration value for the given property key
         * @param  {String} key Property key
         * @return {mixed}
         */
        get: function (key) {
            return this.vals[key];
        },

        /**
         * Returns a map of all configuration properties and their values
         * @return {Object}
         */
        getAll: function() {
            return _.clone(this.vals, true);
        },

        /**
         * Sets a configuration value for the given property key
         * @param {String} key Property key
         * @param {mixed}  val Property value
         * @return {config}      (for chainability)
         */
        set: function (key, val) {
            var cfg = this,
                prev = this.get(key);

            this.vals[key] = val;
            this.trigger('config:update', {
                key: key,
                oldval: prev,
                newval: val,
                config: cfg
            });
            return this;
        }
    };
    // mix in Backbone.Events
    _.extend(config, Backbone.Events);

    // initialise for the dev environment
    config.init(__CONFIG, 'dev');
    return config;
});
