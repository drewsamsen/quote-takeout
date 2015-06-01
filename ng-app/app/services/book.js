'use strict';

angular.module('quoteTakeout')

.service('Book', function(API) {

  var bookService = {

    books: [],

    getBooks: function() {
      // Dob't re-GET if we already have books
      if (bookService.books.length > 0) { return false; }
      API.books.all().then(function(resp) {
        bookService.books = resp.data.books;
      });
    }

  };

  return bookService;

});