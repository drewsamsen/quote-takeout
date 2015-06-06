'use strict';

angular.module('quoteTakeout')

.controller('BookCtrl', function($scope, API, Notifier, Book) {

  $scope.newBook = {};

  Book.bootstrap();

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