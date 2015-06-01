'use strict';

angular.module('quoteTakeout')

.service('Notifier', function() {

  var notifierService = {

    show: function(message, timeout) {
      timeout = timeout || 1800;
      Materialize.toast(message, timeout);
    }

  };

  return notifierService;

});