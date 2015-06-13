'use strict';

angular.module('quoteTakeout')

.service('Quote', function(API, Notifier, $state, $q) {

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
    var deferred = $q.defer();

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
    deferred.resolve(quoteService.quotes);
    return deferred.promise;
  };

  // Call up the API for all the quotes from a given book. Then ask fetchQuotesFromMem()
  // to put things in the correct place.
  var getQuotesFromApi = function(bookId) {
    return API.quotes.all({book_id: bookId})
    .then(function(resp) {
      quoteService.books[bookId] = {
        quotes: resp.data.quotes,
        quotesCount: resp.data.count
      };
    });
  };

  // Get the next quote in the current quotes collection in memory
  var getNextQuote = function() {
    var newIndex, newQuote;
    if (quoteService.quotes &&
      angular.isArray(quoteService.quotes) &&
      quoteService.quotes.length > 0 &&
      quoteService.quote &&
      angular.isDefined(quoteService.quote.index)) {

      newIndex = parseInt(quoteService.quote.index) + 1;

      if (newIndex >= quoteService.quotes.length) {
        Notifier.show('This is the last quote in the current collection.');
        return false;
      } else {
        console.info('getting quote '+(newIndex+1)+'/'+quoteService.quotes.length);
        newQuote = quoteService.quotes[newIndex];
        return newQuote;
      }
    }
  };

  // Get the previous quote in the current quotes collection in memory
  var getPreviousQuote = function() {
    var newIndex, newQuote;
    if (quoteService.quotes &&
      angular.isArray(quoteService.quotes) &&
      quoteService.quotes.length > 0 &&
      quoteService.quote &&
      angular.isDefined(quoteService.quote.index)) {

      newIndex = parseInt(quoteService.quote.index) - 1;

      if (newIndex < 0) {
        Notifier.show('This is the first quote in the current collection.');
        return false;
      } else {
        console.info('getting quote '+(newIndex+1)+'/'+quoteService.quotes.length);
        newQuote = quoteService.quotes[newIndex];
        return newQuote;
      }
    }
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
    allTags: [],

    getQuotes: function(query) {
      API.quotes.all(query)
      .then(function(resp) {
        quoteService.quotes = resp.data.quotes;
        quoteService.quotesCount = resp.data.quotes.length;
      });
    },

    getQuote: function(bookId, quoteId) {
      var
        bId = parseInt(bookId),
        qId = parseInt(quoteId);
      if (quotesInMemory(bId)) {
        return fetchQuotesFromMem(bId, qId)
      } else {
        return getQuotesFromApi(bId)
        .then(function() {
          fetchQuotesFromMem(bookId, quoteId);
        });
      }
    },

    getTags: function(quoteId) {
      // Do nothing if we already have the tags for this quote
      if (quoteService.quote.tags) {
        console.info('already have tags for quote', quoteId);
        return false;
      }

      return API.quotes.getTags(quoteId)
      .then(function(resp) {
        quoteService.quote.tags = resp.data.tags;
        if (quoteService.quotes && quoteService.quotes.length > 0) {
          for (var i = 0; i < quoteService.quotes.length; i++) {
            if (quoteService.quotes[i].id == quoteId) {
              quoteService.quotes[i].tags = resp.data.tags;
              break;
            }
          }
        }
      });
    },

    setTags: function(tagList) {
      return API.quotes.setTags(quoteService.quote.id, tagList)
      .then(function(resp) {
        if (resp.status === 200) {
          Notifier.show('Success: tags updated');
        } else {
          console.error('something went wrong');
        }
      });
    },

    getAllTags: function() {
      if (quoteService.tags && quoteService.tags.length > 0) {
        console.log('already have all tags');
        return false;
      }

      return API.quotes.getAllTags()
      .then(function(resp) {
        if (resp.status === 200) {
          quoteService.allTags = resp.data.tags;
        }
      });

    },

    next: function() {
      var nextQuote = getNextQuote();
      if (nextQuote) {
        $state.go('layout_app.books.show.quotes.show', {bookId: nextQuote.book_id, quoteId: nextQuote.id});
      }
    },

    previous: function() {
      var previousQuote = getPreviousQuote();
      if (previousQuote) {
        $state.go('layout_app.books.show.quotes.show', {bookId: previousQuote.book_id, quoteId: previousQuote.id});
      }
    },

    deleteQuote: function(bookId, quoteId) {
      return API.books.deleteQuote(bookId, quoteId)
      .then(function(resp) {
        if (resp.status === 204) {
          Notifier.show('Success: quote deleted');

          if (quoteService.quotesCount) {
            quoteService.quotesCount -= 1;
          }

          for (var i = 0; i < quoteService.quotes.length; i++) {
            if (quoteService.quotes[i].id === quoteId) {
              quoteService.quotes[i].is_deleted = true;
              break;
            }
          }

        }
      });
    }

  };

  //
  // End public methods
  //

  return quoteService;

});