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
    abstract: true,
    url: '/books',
    // Note that abstract view still needs a ui-view for its children to populate
    // so we add it inline here
    template: '<ui-view/>'
  })

  .state('layout_app.books.index', {
    url: '/index',
    templateUrl: 'modules/book/book.index.html',
    controller: 'BookIndexCtrl'
  })

  .state('layout_app.books.show', {
    url: '/{bookId:[0-9]+}',
    templateUrl: 'modules/book/book.show.html',
    controller: 'BookShowCtrl'
  })

  .state('layout_app.quotes', {
    abstract: true,
    url: '/books/{bookId:[0-9]+}/quotes',
    // Note that abstract view still needs a ui-view for its children to populate
    // so we add it inline here
    template: '<ui-view/>'
  })

  .state('layout_app.quotes.show', {
    url: '/{quoteId:[0-9]+}',
    templateUrl: 'modules/quote/quote.show.html',
    controller: 'QuoteShowCtrl'
  });

});