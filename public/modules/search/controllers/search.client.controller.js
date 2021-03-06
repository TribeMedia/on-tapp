'use strict';

angular.module('search').controller('SearchController', ['$scope', 'Search', '$stateParams', '$state', 'usSpinnerService',
  function($scope, Search, $stateParams, $state, usSpinnerService) {
    // Search controller logic
    $scope.results = [];
    $scope.totalResults = undefined;

    $scope.search = function(currentPage) {
      currentPage = currentPage || 1;
      $state.go('search', {'page': currentPage, 'keyword': $scope.keyword});
      $scope.keyword = '';
    };

    Search.getData($stateParams.keyword, $stateParams.page).success(function(response, status) {
      $scope.status = status;
      if ($scope.status === 200) {
        if (response.totalResults !== undefined) {
          $scope.numberOfPages = response.numberOfPages;
          $scope.totalResults = response.totalResults;
          $scope.keyword = $stateParams.keyword;
          $scope.currentPage = $stateParams.page;
          $scope.results = response.data;
        } else {
          $scope.totalResults = 0;
          $scope.numberOfPages = 0;
        }
      } else {
        $scope.results = response || 'Request failed';
      }
      usSpinnerService.stop('spinner-2'); //stop the spinner
    });
  }


]);
