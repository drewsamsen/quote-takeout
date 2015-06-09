'use strict';

angular.module('quoteTakeout')

.service('Quote', function(API, Notifier, $state) {

  //
  // Begin private functions
  //

  // returns boolean. Do we already have the quotes for the specific book in
  // memory?
  var quotesInMemory = function(bookId) {
    return (quoteService.books[bookId] &&
      quoteService.books[bookId].quotes &&
      angular.isArray(quoteService.books[bookId].quotes));
  };

  // Look through the collection of books and quotes and pull the quotes we want
  // onto the main quoteService.quotes object.
  //
  // Also then optionally get a specific quote, by id, and put that on
  // quoteService.quote. This is for the quote#show view.
  //
  var fetchQuotesFromMem = function(bookId, quoteId) {
    quoteService.quotes = quoteService.books[bookId].quotes;
    quoteService.quotesCount = quoteService.books[bookId].quotesCount;

    if (quoteId) {
      for (var i = 0; i < quoteService.quotes.length; i++) {
        if (quoteService.quotes[i].id == quoteId) {
          quoteService.quote = quoteService.quotes[i];
          quoteService.quote.index = i;
          break;
        }
      }
    }

  };

  // Call up the API for all the quotes from a given book. Then ask fetchQuotesFromMem()
  // to put things in the correct place.
  var getQuotesFromApi = function(bookId, quoteId) {
    API.books.getQuotes(bookId)
    .then(function(resp) {
      quoteService.books[bookId] = {
        quotes: resp.data.quotes,
        quotesCount: resp.data.count
      };
      fetchQuotesFromMem(bookId, quoteId);
    });
  };

  //
  // End private helper functions
  // Begin public methods
  //

  var quoteService = {

    // Objects that will get filled at some point during the user flow
    books: {},
    quotes: [],
    quotesCount: 0,
    quote: {},

    getQuotes: function(bookId) {
      var bId = parseInt(bookId);
      if (!quotesInMemory(bId)) {
        getQuotesFromApi(bId);
      }
    },

    getQuote: function(bookId, quoteId) {
      var
        bId = parseInt(bookId),
        qId = parseInt(quoteId);
      quotesInMemory(bId) ? fetchQuotesFromMem(bId, qId) : getQuotesFromApi(bId, qId);
    },

    next: function(bookId) {
      var newIndex, newQuoteId;

      if (quoteService.quotes &&
        angular.isArray(quoteService.quotes) &&
        quoteService.quotes.length > 0 &&
        quoteService.quote &&
        angular.isDefined(quoteService.quote.index)) {

        newIndex = parseInt(quoteService.quote.index) + 1;

        if (newIndex >= quoteService.quotes.length) {
          Notifier.show('This is the last quote in the book.');
        } else {
          console.info('getting quote '+(newIndex+1)+'/'+quoteService.quotes.length);
          newQuoteId = quoteService.quotes[newIndex].id;
          $state.go('layout_app.quotes.show', {bookId: bookId, quoteId: newQuoteId});
        }
      }
    },

    previous: function(bookId) {
      var newIndex, newQuoteId;

      if (quoteService.quotes &&
        angular.isArray(quoteService.quotes) &&
        quoteService.quotes.length > 0 &&
        quoteService.quote &&
        angular.isDefined(quoteService.quote.index)) {

        newIndex = parseInt(quoteService.quote.index) - 1;

        if (newIndex < 0) {
          Notifier.show('This is the first quote in the book.');
        } else {
          console.info('getting quote '+(newIndex+1)+'/'+quoteService.quotes.length);
          newQuoteId = quoteService.quotes[newIndex].id;
          $state.go('layout_app.quotes.show', {bookId: bookId, quoteId: newQuoteId});
        }
      }
    }

  };

  //
  // End public methods
  //

  return quoteService;

});