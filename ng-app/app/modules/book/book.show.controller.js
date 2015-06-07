'use strict';

angular.module('quoteTakeout')

.controller('BookShowCtrl', function($scope, Book, API, Quote, $stateParams,
  Notifier, hotkeys) {

  $scope.newJsonPost = {};
  $scope.selectedQuote = {};
  $scope.bookQuotes = [];
  $scope.quotesCount = 0;

  // quoteId is optionally present when showing an individual quote
  Book.bootstrap($stateParams.bookId, $stateParams.quoteId);

  hotkeys.bindTo($scope)
  .add({
    combo: 'right',
    description: 'Next quote in book',
    callback: function() { Quote.next() }
  })
  .add({
    combo: 'left',
    description: 'Previous quote in book',
    callback: function() { Quote.previous() }
  });

  // TODO: just call bookService directly from view?
  $scope.updateBook = function(book) {
    Book.update(book.id, book);
  };

  $scope.deleteQuote = function(bookId, quoteId) {
    API.books.deleteQuote(bookId, quoteId)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: quote deleted');
        $scope.quotesCount -= 1;
        $('#show-quote-modal').closeModal();
        for (var i = 0; i < $scope.bookQuotes.length; i++) {
          if ($scope.bookQuotes[i].id === quoteId) {
            $scope.bookQuotes[i].is_deleted = true;
            break;
          }
        }
      }
    })
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
        $scope.newJsonPost = {};
        // TODO: re-order, by location
        $scope.bookQuotes = $scope.bookQuotes.concat(resp.data.quotes);
      }
    })
  };

  $scope.showQuote = function(quote) {
    Quote.quote = quote;
    $('#show-quote-modal').openModal();
  };

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  };

});