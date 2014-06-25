define([
    'core',
    'views/base'
],
function(core, BaseView) {
    'use strict';

    var ConfigView = BaseView.extend({

        templateId: 'config',

        getState: function() {
            return core.config;
        }
    });

    return ConfigView;
});
