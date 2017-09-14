angular.module('listings').factory('Listings', ['$http', 
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/listings');
      },

      create: function(listing) {
        console.log(listing);
        return $http.post('http://localhost:8080/api/listings', listing);
      }, 

      read: function(id) {
        return $http.get('http://localhost:8080/api/listings/' + id);
      }, 

      update: function(listing) {
        return $http.put('http://localhost:8080/api/listings/' + listing._id, listing);
      }, 

      delete: function(id) {
        return $http.delete('http://localhost:8080/api/listings/' + id);
      }
    };

    return methods;
  }
]);