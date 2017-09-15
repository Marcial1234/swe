angular.module('listings').factory('Listings', ['$http', 
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('/api/listings');
      },

      create: function(listing) {
        console.log(listing);
        return $http.post('/api/listings', listing);
      }, 

      read: function(id) {
        return $http.get('/api/listings/' + id);
      }, 

      update: function(listing) {
        return $http.put('/api/listings/' + listing._id, listing);
      }, 

      delete: function(id) {
        return $http.delete('/api/listings/' + id);
      }
    };

    return methods;
  }
]);