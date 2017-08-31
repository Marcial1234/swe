GOOGLE_MAPS_BASIC_MAP = "https://www.google.com/maps/place/"

// todo => add and filter

angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    // $scope.typeof = function(variable) {return typeof variable};

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */

    $scope.addListing = function() {
      // Create some input field, make some mandatory at least 'name' ? 
      // append to listsing object
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