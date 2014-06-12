define(['underscore'], function(_) {

    var __CONFIG = {
        // common/default configuration
        common: {
            name: 'App'
        },

        // dev environment overrides
        dev: {

        },

        // prod environment overrides
        prod: {

        }
    };

    var config = {

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

        set: function (key, val) {
            this.vals[key] = val;
            return this;
        }

    };

    config.setenv('dev');
    return config;
});
