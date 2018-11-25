var App = angular.module('App', ['ngRoute']);

App.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'Views/AccountsView/home.html',
            controller: 'HomeController'
        })
        .when('/edit', {
            templateUrl: 'Views/AccountsView/edit.html',
            controller: 'EditController'
        })
        .when('/delete', {
            templateUrl: 'Views/AccountsView/delete.html',
            controller: 'DeleteController'
        })
        .when('/create', {
            templateUrl: 'Views/AccountsView/create.html',
            controller: 'CreateController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

App.controller('HomeController', function($scope) {
    $scope.message = "Home View Created";
});

App.controller('EditController', function($scope) {
    $scope.message = "Edit View Created";
});

App.controller('DeleteController', function($scope) {
    $scope.message = "Delete View Created";
});

App.controller('CreateController', function($scope) {
    $scope.message = "Create View Created";
});
