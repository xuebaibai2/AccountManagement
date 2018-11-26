var App = angular.module('App', ['ngRoute', 'AccountService', 'angularUtils.directives.dirPagination', 'ngMaterial', 'ngMessages']);

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
        .when('/create', {
            templateUrl: 'Views/AccountsView/create.htm',
            controller: 'CreateController'
        })
        .when('/password', {
            templateUrl: 'Views/AccountsView/password.htm',
            controller: 'PasswordController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
