'use strict';

angular.module('quoteTakeout', [
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'ngStorage',
    'angular-cache',
    'ng-token-auth',
    'cfp.hotkeys'
  ])

.config(function($httpProvider, $authProvider, $locationProvider, API_URL) {

  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  /**
   * Fix for hotmail.com users (when /#!/ becomes /#%21/)
   */
  if (window.location.hash.substr(0, 4) === '#%21') {
    window.location.replace(window.location.href.split('#%21').join('#!'));
  }

  // $httpProvider.defaults.transformRequest = function( data ) {
  //   return angular.isObject( data ) && String( data ) !== '[object File]' ? $.param( data ) : data;
  // };

  $httpProvider.defaults.withCredentials = true;

  $authProvider.configure({
    apiUrl: API_URL
  });

})

.run(function($rootScope, Notifier, $state, ENV, API_URL, Book) {

  $rootScope.ENV = ENV;
  $rootScope.API_URL = API_URL;

  // Get a reference to the Book service onto $rootScope so that it can be used
  // directly from the views.
  $rootScope.Book = Book;

  /**
   * Check access for requested pages. Note the $auth.validateUser() in a state
   * resolve will throw the $stateChangeError if the user is not authenticated
   */
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    Notifier.show('Please log in');
    $state.go('layout_guest.login');
  });

});