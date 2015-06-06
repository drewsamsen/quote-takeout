'use strict';

angular.module('quoteTakeout')

.service('Quote', function(API, Notifier) {

  //
  // Begin private functions
  //

  var quotesInMemory = function(bookId) {
    return (quoteService.books[bookId] &&
      quoteService.books[bookId].quotes &&
      angular.isArray(quoteService.books[bookId].quotes));
  };

  var fetchQuotes = function(bookId) {
    console.log('fetchQuotes from collection in memory');
    quoteService.quotes = quoteService.books[bookId].quotes;
    quoteService.quotesCount = quoteService.books[bookId].quotesCount;
  };

  var getQuotes = function(bookId) {
    console.log('getQuotes from API');
    API.books.getQuotes(bookId)
    .then(function(resp) {
      quoteService.books[bookId] = {
        quotes: resp.data.quotes,
        quotesCount: resp.data.count
      };
      fetchQuotes(bookId);
    });
  };

  //
  // End private helper functions
  // Begin public methods
  //

  var quoteService = {

    books: {},
    quotes: [],
    quotesCount: 0,
    quote: {},

    // Get quotes ready for a given bookId
    bootstrapBook: function(bookId) {
      var id = parseInt(bookId);
      quotesInMemory(id) ? fetchQuotes(id) : getQuotes(id);
    }

  };

  //
  // End public methods
  //

  return quoteService;

});