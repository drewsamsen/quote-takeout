'use strict';

angular.module('quoteTakeout')

.controller('QuoteShowCtrl', function($scope, Book, API, Quote, $stateParams,
  Notifier, hotkeys) {

  Book.getBook($stateParams.bookId);

  Quote.getQuote($stateParams.bookId, $stateParams.quoteId)
  .then(function() {
    Quote.getTags($stateParams.quoteId)
  });

  hotkeys.bindTo($scope)
  .add({
    combo: 'right',
    description: 'Next quote in book',
    callback: function() { Quote.next($stateParams.bookId) }
  })
  .add({
    combo: 'left',
    description: 'Previous quote in book',
    callback: function() { Quote.previous($stateParams.bookId) }
  });

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

  $scope.setTags = function(tagList) {
    API.quotes.setTags(Quote.quote.id, tagList)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: tags updated');
      } else {
        console.error('something went wrong');
      }
    })
  }

});