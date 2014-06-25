define([
    'core'
],
function(core) {
    'use strict';

    var BaseView = core.Backbone.View.extend({

        el: core.config.get('container'),
        templateId: null,

        getState: function() {
            return {
                app: App,
                core: core
            };
        },

        render: function() {
            var content = this.template(this.getState());
            this.$el.html(content);
            return this;
        },

        template: function(data) {
            return (this.templateId && core.templates[this.templateId]) ?
                core.templates[this.templateId](data) : '';
        }

    });

    return BaseView;
});
