'use strict';

angular.module('quoteTakeout')

.controller('BookShowCtrl', function($scope, Book, API, Quote, $stateParams,
  Notifier) {

  Book.getBook($stateParams.bookId);

  // TODO: just call bookService directly from view?
  $scope.updateBook = function(book) {
    Book.update(book.id, book);
  };

  $scope.deleteQuote = function(bookId, quoteId) {
    API.books.deleteQuote(bookId, quoteId)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: quote deleted');
        Quote.quotesCount -= 1;
        $('#show-quote-modal').closeModal();
        for (var i = 0; i < Quote.quotes.length; i++) {
          if (Quote.quotes[i].id === quoteId) {
            Quote.quotes[i].is_deleted = true;
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
        Quote.quotes = Quote.quotes.concat(resp.data.quotes);
      }
    })
  };

  $scope.quoteModal = function(quote) {
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