'use strict';

angular.module('nearby').factory('Breweries', [
	function($http) {
		// Breweries service logic
		// ...

		// Public API
		return {
      getData: function(coords){
        return $http.get('/breweries/' + coords.lat + '/' + coords.long);
      }
    };
	}
]);
