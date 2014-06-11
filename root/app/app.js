define([
    'core'
],
function(core) {

    var Application = {

        config: core.config,
        templates: core.templates,

        init: function() {
            this.render();
        },

        render: function() {
            $('title').text(this.config.get('name'));
            $('#main').html(this.templates.index({}));
        }

    };

    return Application;
});
