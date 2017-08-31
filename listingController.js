GOOGLE_MAPS_BASIC_MAP = "https://www.google.com/maps/place/"

// todo => pretty add

angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    // maintain unique codes? why not!
    codes = [];

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */

    $scope.addListing = function() {
      // Create some input field, make some mandatory at least 'name' ? 
      // append to listsing object
      var new_listing = {};
      new_listing.code = $scope.code.toUpperCase();
      new_listing.name = $scope.name;

      // address
      if ($scope.address != undefined) {
        new_listing.address = $scope.address;
      }
      
      // coordinates
      if ($scope.latitude != undefined && $scope.longitude != undefined) {
        var coordinates = { 'latitude': $scope.latitude, 'longitude': $scope.longitude };
        new_listing.coordinates = coordinates;
      }

      $scope.listings.push(new_listing);
    };

    $scope.deleteListing = function(item) {
      // reset "Detailed Info" if selected
      if ($scope.detailedInfo == item) {
        $scope.detailedInfo = undefined;
      }

      // delete from struct/arr
      index = Listings.indexOf(item);
      $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(item) {
      $scope.detailedInfo = item;
      $scope.detailedInfoDetails = Object.keys(item);
      var name = $scope.detailedInfo.name;

      if (name != undefined) {
        var map = GOOGLE_MAPS_BASIC_MAP + name;
        $scope.mapOfSelectedItem = map;
      }
    };
  }
]);