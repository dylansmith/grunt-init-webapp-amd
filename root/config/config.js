define([
    'underscore',
    'backbone'
],
function(_, Backbone) {

    var __CONFIG = {
        // common/default configuration
        common: {
            name: 'App',
            container: '#main'
        },

        // dev environment overrides
        dev: {

        },

        // prod environment overrides
        prod: {

        }
    };

    var config = _.extend({

        vals: {},
        env: 'dev',

        getenv: function() {
            return this.env;
        },

        setenv: function(val) {
            this.env = val;
            this.vals = _.assign({}, __CONFIG.common, __CONFIG[val] || {});
            return this;
        },

        get: function (key) {
            return this.vals[key] || undefined;
        },

        getAll: function() {
            return _.clone(this.vals, true);
        },

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

    }, Backbone.Events);

    config.setenv('dev');
    return config;
});
