'use strict';

angular.module('quoteTakeout')

.controller('UserCtrl', function($scope, API) {

  $scope.users = {};

  API.users.all().then(function(resp) {
    console.log('resp', resp);
    $scope.users = resp.data.users;
  });

});