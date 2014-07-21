define([
    'core',
    'views/base'
],
function(core, BaseView) {
    'use strict';

    var HomeView = BaseView.extend({

        templateId: 'home',

        getState: function() {
            return {
                config: JSON.stringify(core.config.vals)
            };
        }
    });

    return HomeView;
});
