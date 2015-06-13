'use strict';

angular.module('quoteTakeout')

.controller('BookShowQuotesCtrl', function($scope, Book, Quote, $stateParams, hotkeys) {

  Quote.getQuotes({book_id: $stateParams.bookId});

  // Quote.getQuote($stateParams.bookId, $stateParams.quoteId)
  // .then(function() {
  //   Quote.getTags($stateParams.quoteId)
  // });

  hotkeys.bindTo($scope)
  .add({
    combo: 'right',
    description: 'Next quote in current collection',
    callback: function() { Quote.nextInBook() }
  })
  .add({
    combo: 'left',
    description: 'Previous quote in current collection',
    callback: function() { Quote.previousInBook() }
  });

});