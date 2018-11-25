var App = angular.module('App', ['ngRoute', 'AccountService']);

App.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'Views/AccountsView/home.htm',
            controller: 'HomeController'
        })
        .when('/edit', {
            templateUrl: 'Views/AccountsView/edit.htm',
            controller: 'EditController'
        })
        .when('/delete', {
            templateUrl: 'Views/AccountsView/delete.htm',
            controller: 'DeleteController'
        })
        .when('/create', {
            templateUrl: 'Views/AccountsView/create.htm',
            controller: 'CreateController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

App.controller('HomeController', function($scope, AccountResource) {
    getAccounts();

    function getAccounts() {
        AccountResource.getAccounts().then(function(accounts) {
            console.log(accounts);
            $scope.accounts = accounts.data;
        },function (error){
            $scope.status = 'Unable to load account data: ' + error.message;
        });
    }
});

App.controller('EditController', function($scope) {
    $scope.message = "Edit View Created";
});

App.controller('DeleteController', function($scope) {
    $scope.message = "Delete View Created";
});

App.controller('CreateController', function($scope, AccountResource) {
    function addAccount() {
        AccountResource.addAccount().then(function(res) {
            console.log(res);
        }, function(error) {
            $scope.status = 'Error occured on creating new account';
        });
    }
});
