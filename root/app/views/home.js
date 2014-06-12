define([
    'core'
],
function(core) {
    'use strict';

    var HomeView = core.Backbone.View.extend({

        el: core.config.get('container'),
        template: core.templates.home,

        render: function() {
            this.$el.html(this.template({
                config: JSON.stringify(core.config.vals)
            }));
            return this;
        }
    });

    return HomeView;
});
