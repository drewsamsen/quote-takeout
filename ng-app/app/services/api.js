'use strict';

angular.module('quoteTakeout')

.service('API', function($http, $auth, Notifier, API_URL) {

  // Query wrapper
  var _query = function(params) {
    params = angular.extend({
      auth: true,
      method: '',
      url: ''
    }, params);

    var http_params = {
      method: params.method,
      url: API_URL + '/' + params.url,
      data: params.data || null
    };
    return $http(http_params);
  };

  var reportErrors = function(resp) {
    console.warn('reportErrors', resp);
    if (angular.isArray(resp.errors)) {
      Notifier.show(resp.errors[0]);
    }
  };

  var api = {

    users: {

      all: function() {
        return _query({
          method: 'GET',
          url: 'users.json'
        });
      }

    },

    books: {

      all: function() {
        return _query({
          method: 'GET',
          url: 'books.json'
        });
      },

      create: function(data) {
        return _query({
          method: 'POST',
          url: 'books.json',
          data: data
        });
      },

      get: function(id) {
        return _query({
          method: 'GET',
          url: 'books/'+id+'.json'
        });
      },

      update: function(id, data) {
        return _query({
          method: 'PUT',
          url: 'books/'+id+'.json',
          data: data
        });
      },

      getQuotes: function(id) {
        return _query({
          method: 'GET',
          url: 'books/'+id+'/quotes.json'
        });
      },

      addQuote: function(bookId, quote) {
        return _query({
          method: 'POST',
          url: 'books/'+bookId+'/quotes.json',
          data: quote
        });
      }

    }

  };

  return api;

});