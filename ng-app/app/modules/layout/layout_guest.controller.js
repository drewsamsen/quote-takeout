'use strict';

angular.module('quoteTakeout')

.controller('LayoutGuestCtrl', function ($scope, $rootScope, $state) {

  $scope.$state = $state;

  $scope.layoutModel = {
    // isGuest: User.isGuest,
    // isAuth: User.isAuth,
    // currentDate: new Date(),
    // isSidebarVisible: false,
    // userAccount: $rootScope.$storage.userAccount
  };

  /**
   * Notifications
   */
  // $rootScope.showNotify = function(status, content, title, timeout) {
  //   Notifier.show(status, content, title, timeout);
  // };

  // $rootScope.hideNotify = function() {
  //   Notifier.hide();
  // };

  // $rootScope.pauseNotifications = function () {
  //   Notifier.pause();
  // };

  // $rootScope.resumeNotifications = function () {
  //   Notifier.resume();
  // }
});

