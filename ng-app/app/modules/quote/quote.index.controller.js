'use strict';

angular.module('quoteTakeout')

.controller('QuoteIndexCtrl', function($scope, Quote, Notifier, $stateParams) {

  Quote.quotes = [];
  Quote.quotesCount = 0;
  Quote.getAllTags();

  // If present, will pass along a query obj. WIll be ignored if no query string
  // present for tag
  Quote.getQuotes({tag: $stateParams.tag});

});