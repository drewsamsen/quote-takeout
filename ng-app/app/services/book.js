'use strict';

angular.module('quoteTakeout')

.service('Book', function(API, Notifier, Quote) {

  //
  // Begin private functions
  //

  var updateFiltering = function() {
    if (bookService.filters.labels.length > 0) {
      angular.forEach(bookService.books, function(book, i) {
        book.filteredOut = true;
        for (var i = 0; i < bookService.filters.labels.length; i++) {
          if (book.labels.indexOf(bookService.filters.labels[i]) !== -1) {
            book.filteredOut = false;
            break;
          }
        }
      });
    } else {
      angular.forEach(bookService.books, function(book, i) {
        book.filteredOut = false;
      });
    }
  };

  // Check if a certain bookId exists in the current books colletion
  var bookInMemory = function(bookId) {
    if (bookService.books && bookService.books.length > 0) {
      for (var i = 0; i < bookService.books.length; i++) {
        if (bookService.books[i].id === parseInt(bookId)) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  // Plucks the specified book from the books collection in memory
  var fetchBook = function(bookId) {
    console.log('fetchBook from collection in memory');
    for (var i = 0; i < bookService.books.length; i++) {
      if (bookService.books[i].id === parseInt(bookId)) {
        bookService.book = bookService.books[i];
        break;
        return true;
      }
    }
    return false;
  };

  // Do a real GET from the API
  var getBook = function(bookId) {
    console.log('getBook from API');
    API.books.get(bookId)
    .then(function(resp) {
      bookService.book = resp.data.book;
      bookService.book.labels = resp.data.labels;
    });
  };

  // Update the current book (if active) and the book in the collection
  var updateInMemory = function(bookData) {
    if (bookService.book.id == bookData.id) {
      bookService.book = bookData;
    }
    if (bookService.books && bookService.books.length > 0) {
      for (var i = 0; i < bookService.books.length; i++) {
        if (bookService.books[i].id == bookData.id) {
          bookService.books[i] = bookData;
          break;
        }
      }
    }
  };

  //
  // End private helper functions
  // Begin public methods
  //

  var bookService = {

    books: [],
    book: {},
    labels: [],
    filters: {
      labels: []
    },

    // If an ID is passed, get and set up individual book. Otherwise get all.
    // Optional quoteId can be passed in if we need to pull out a specific
    // quote, like on quote#show
    bootstrap: function(bookId, quoteId) {

      // Get book
      if (bookId) {
        bookInMemory(bookId) ? fetchBook(bookId) : getBook(bookId);

        // Get quotes for book, optionally a specific quote if quoteId present
        Quote.bootstrapBook(bookId, quoteId);

      } else {
        bookService.getBooks();
        bookService.getLabels();
      }

    },

    getBooks: function() {
      API.books.all()
      .then(function(resp) {
        bookService.books = resp.data.books;
      });
    },

    update: function(bookId, bookData) {
      API.books.update(bookId, bookData)
      .then(function(resp) {
        if (resp.status === 200) {
          Notifier.show('Success: Book updated');
          updateInMemory(resp.data.book);
        }
      });
    },

    getLabels: function() {
      API.books.getAllLabels()
      .then(function(resp) {
        if (resp.status === 200) {
          bookService.labels = resp.data.labels;
        }
      });
    },

    // Add or remove label from filters
    toggleLabelFilter: function(label) {
      var detectedIndex = bookService.filters.labels.indexOf(label);
      if (detectedIndex === -1) {
        bookService.filters.labels.push(label);
      } else {
        bookService.filters.labels.splice(detectedIndex, 1);
      }
      updateFiltering();
    }

  };

  //
  // End public methods
  //

  return bookService;

});