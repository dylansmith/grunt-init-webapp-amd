define(function(require) {

    var Application = {

        init: function() {
            this.render();
        },

        render: function() {
            // render
            $('#main').html(JST.index({}));
        }

    };

    return Application;
});
