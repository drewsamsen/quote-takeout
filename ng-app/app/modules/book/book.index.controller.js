'use strict';

angular.module('quoteTakeout')

.controller('BookIndexCtrl', function($scope, API, Notifier, Book) {

  $scope.newBook = {};

  // TODO: These both seem to hit the API at each load of book index....
  Book.getBooks();
  Book.getLabels();

  $scope.createBook = function(data) {
    API.books.create(data)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Added new book');
        $scope.newBook = {};
        Book.books.push(resp.data.book);
      }
    });
  };

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  };

});