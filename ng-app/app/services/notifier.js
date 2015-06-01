'use strict';

angular.module('quoteTakeout')

.service('Notifier', function() {

  var notifierService = {

    show: function(message) {
      Materialize.toast(message, 1800);
    }

  };

  return notifierService;

});