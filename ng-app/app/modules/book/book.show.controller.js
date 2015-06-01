'use strict';

angular.module('quoteTakeout')

.controller('BookShowCtrl', function($scope, API, $stateParams, Notifier) {

  $scope.book = {};

  API.books.get($stateParams.bookId)
  .then(function(resp) {
    console.log('resp', resp);
    $scope.book = resp.data.book;
  });

  // TODO: build up cache of all this data on service object
  API.books.getQuotes($stateParams.bookId)
  .then(function(resp) {
    console.log('resp', resp);
    $scope.bookQuotes = resp.data.quotes;
  });

  $scope.updateBook = function(book) {
    API.books.update(book.id, book)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Book updated');
        $scope.book = resp.data.book;
      }
    });
  }

});