'use strict';

angular.module('quoteTakeout')

.controller('BookIndexCtrl', function($scope, API, Notifier, Book, $stateParams) {

  $scope.newBook = {};

  $scope.activeLabel = $stateParams.label;

  Book.books = [];

  // If present, will pass along query obj. Will be ignored if no query string
  // present for label
  Book.getBooks({label: $stateParams.label});
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