'use strict';

angular.module('quoteTakeout')

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider

  /**
   * Routes for guests
   */
  .state('layout_guest', {
    abstract: true,
    views: {
      'root': {
        templateUrl: 'modules/layout/layout_guest.html',
        controller: 'LayoutGuestCtrl'
      },
      'header': {
        templateUrl: 'modules/layout/_layout_app_header.html',
        controller: 'LayoutAppCtrl'
      },
      'footer': {
        templateUrl: 'modules/layout/_layout_app_footer.html',
        controller: 'LayoutAppCtrl'
      }
    }
  })

  .state('layout_guest.login', {
    url: '/login',
    templateUrl: 'modules/guest/login.html',
    controller: 'LoginCtrl',
  })

  /**
   * Routes for authorized users
   */
  .state('layout_app', {
    abstract: true,
    views: {
      'root': {
        templateUrl: 'modules/layout/layout_app.html',
        controller: 'LayoutAppCtrl'
      },
      'header': {
        templateUrl: 'modules/layout/_layout_app_header.html',
        controller: 'LayoutAppCtrl'
      },
      'footer': {
        templateUrl: 'modules/layout/_layout_app_footer.html',
        controller: 'LayoutAppCtrl'
      }
    },
    // Blocks unauthenticated users, redirecting to /login (applies to all
    // child states also)
    resolve: {
      auth: function($auth) {
        return $auth.validateUser();
      }
    }
  })

  .state('layout_app.dashboard', {
    url: '/dashboard',
    templateUrl: 'modules/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })

  .state('layout_app.users', {
    url: '/users',
    templateUrl: 'modules/user/user.html',
    controller: 'UserCtrl'
  })

  .state('layout_app.books', {
    url: '/books',
    templateUrl: 'modules/book/book.html',
    controller: 'BookCtrl'
  })

  .state('layout_app.books.show', {
    url: '/{bookId:[0-9]+}',
    templateUrl: 'modules/book/book.show.html',
    controller: 'BookShowCtrl'
  });

});