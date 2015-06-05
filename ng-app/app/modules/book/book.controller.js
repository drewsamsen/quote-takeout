'use strict';

angular.module('quoteTakeout')

.controller('BookCtrl', function($scope, API, Notifier, Book) {

  $scope.newBook = {};

  $scope.filters = {
    labels: []
  };

  Book.getBooks();

  // TODO: make labels service
  API.books.getAllLabels()
  .then(function(resp) {
    if (resp.status === 200) {
      $scope.bookLabels = resp.data.labels;
    }
  });

  var updateFiltering = function() {
    if ($scope.filters.labels.length > 0) {
      angular.forEach(Book.books, function(book, i) {
        book.filteredOut = true;
        for (var i = 0; i < $scope.filters.labels.length; i++) {
          if (book.labels.indexOf($scope.filters.labels[i]) !== -1) {
            book.filteredOut = false;
            break;
          }
        }
      });
    } else {
      angular.forEach(Book.books, function(book, i) {
        book.filteredOut = false;
      });
    }
  };

  // Add or remove label from filters
  $scope.toggleLabelFilter = function(label) {
    var detectedIndex = $scope.filters.labels.indexOf(label);
    if (detectedIndex === -1) {
      $scope.filters.labels.push(label);
    } else {
      $scope.filters.labels.splice(detectedIndex, 1);
    }
    updateFiltering();
  }

  $scope.createBook = function(data) {
    API.books.create(data)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Added new book');
        $scope.newBook = {};
        Book.books.push(resp.data.book);
      }
    });
  }

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }

});