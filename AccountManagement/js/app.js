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

App.controller('PasswordController', function($scope, AccountResource, $route) {
    var editAccountId = $route.current.params.id;
    $scope.newPassword = '';
    $scope.resetBtnClicked = function() {
        AccountResource.resetPasswordById(editAccountId, $scope.newPassword).then(function(res) {
            console.log('password is set', res);
        });
    };
});

App.controller('HomeController', function ($scope, AccountResource) {
    $scope.accounts = [];
    getAccounts();

    $scope.deleteAccount = function(id) {
        AccountResource.deleteAccountById(id).then( function (res) {
            console.log(res);
            var index = $scope.accounts.indexOf(res.data);
            $scope.accounts.splice(index, 1);  
        });
    };

    function getAccounts() {
        AccountResource.getAccounts().then(function (accounts) {
            console.log(accounts);
            $scope.accounts = accounts.data;
        }, function (error) {
            $scope.status = 'Unable to load account data: ' + error.message;
        });
    }
});

App.controller('EditController', function ($scope, AccountResource, $route) {

    var editAccountId = $route.current.params.id;
    AccountResource.getAccountById(editAccountId).then(function (account) {
        // TODO: concider account from response after connect to local web api
        console.log(account);
        loadAccount(account.data);
        console.log($scope.account);
    });

    function loadAccount (account) {
        $scope.account = {};
        $scope.account.UserId = account.UserId;
        $scope.account.Username = account.Username;
        $scope.account.Firstname = account.Firstname;
        $scope.account.Lastname = account.Lastname;
        $scope.account.DateOfBirth = account.DateOfBirth;
        $scope.account.Email = account.Email;
        $scope.account.Phone = account.Phone;
        $scope.account.Mobile = account.Mobile;
        $scope.account.Password = account.Password;
    }

    $scope.updateAccount = function() {
        AccountResource.updateAccount($scope.account).then(function (res) {
            $scope.account = res.data;
        }, function (error) {
            $scope.status = 'Error occured on updating new account';
        });
    };

});

App.controller('CreateController', function ($scope, AccountResource, $window) {

    $scope.account = {};

    $scope.addAccount = function () {
        AccountResource.addAccount($scope.account).then(function (res) {
            $window.location.href = '/';
        }, function (error) {
            $scope.status = 'Error occured on creating new account';
        });

    };
});