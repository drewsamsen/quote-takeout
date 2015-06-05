'use strict';

angular.module('quoteTakeout')

.controller('BookShowCtrl', function($scope, API, $stateParams, Notifier) {

  $scope.book = {};
  $scope.newJsonPost = {};
  $scope.selectedQuote = {};
  $scope.bookQuotes = [];
  $scope.quotesCount = 0;

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
    $scope.quotesCount = resp.data.count;
  });

  $scope.updateBook = function(book) {
    API.books.update(book.id, book)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Book updated');
        $scope.book = resp.data.book;
      }
    });
  };

  $scope.addQuote = function(bookId, quote) {
    API.books.addQuote(bookId, quote)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show(
          resp.data.summary.total + ' total, ' +
          resp.data.summary.success + ' quotes added, ' +
          resp.data.summary.duplicate + ' duplicates ignored, ' +
          resp.data.summary.failure + ' failures',
          7000
        );
        console.log('data', resp.data);
        $scope.newJsonPost = {};
        // TODO: re-order, by location
        $scope.bookQuotes = $scope.bookQuotes.concat(resp.data.quotes);
      }
    })
  };

  $scope.showQuote = function(quoteId) {
    $scope.selectedQuoteId = quoteId;
    $('#show-quote-modal').openModal();
  };

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  };

});