define([
    'core',
    'views/base'
],
function(core, BaseView) {
    'use strict';

    var NotFoundView = BaseView.extend({
        templateId: '404'
    });

    return NotFoundView;
});
