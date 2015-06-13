'use strict';

angular.module('quoteTakeout')

.controller('QuoteShowCtrl', function($scope, Quote, $stateParams, hotkeys) {

  Quote.getQuote($stateParams.bookId, $stateParams.quoteId)
  .then(function() {
    Quote.getTags($stateParams.quoteId)
  });

  hotkeys.bindTo($scope)
  .add({
    combo: 'right',
    description: 'Next quote in current collection',
    callback: function() { Quote.next() }
  })
  .add({
    combo: 'left',
    description: 'Previous quote in current collection',
    callback: function() { Quote.previous() }
  });

});