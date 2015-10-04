var app = angular.module('Illuminatify', []);

app.controller('IlluminatifyController', ["$scope", "$document", "$compile", "$timeout", "IlluminatifyDataService",
    function ($scope, $document, $compile, $timeout, IlluminatifyDataService) {
        $scope.search = function () {
            var searchText = $scope.searchText;
            searchText = searchText.replace(/ /g,'');
            IlluminatifyDataService.getData(searchText)
                .then(function (result) {
                    console.log(result);
                }, function () {
                    console.log("Error");
                })
        }
        $scope.feelingIlluminaughty = function () {
            console.log(102);
        }
    }]);

app.factory("IlluminatifyDataService", ["$http", "$q", function ($http, $q) {
    var _data = [];

    var _getData = function (searchTerm) {
        var deferred = $q.defer();
        console.log(102);
        $http.get("/search/" + searchTerm)
            .then(function (result) {
                //success
                angular.copy(result.data, _data);
                deferred.resolve(_data);
            }, function () {
                // error
                deferred.reject();
            });
        return deferred.promise;
    }
    return {
        data: _data,
        getData: _getData
    };
}]);
