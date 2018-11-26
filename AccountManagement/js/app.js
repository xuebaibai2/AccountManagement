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

App.controller('PasswordController', function($scope, AccountResource, $route) {
    $scope.updateStatus = false;
    var editAccountId = $route.current.params.id;
    $scope.newPassword = '';
    $scope.resetBtnClicked = function() {
        AccountResource.resetPasswordById(editAccountId, $scope.newPassword).then(function(res) {
            $scope.updateStatus = true;
        });
    };
    $scope.passwordChanged = function() {
        var passwordComplexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([@$!%*?&]*)[A-Za-z\d@$!%*?&]{8,}/;
        $scope.passwordComplexValidationFailed = !passwordComplexRegex.test($scope.newPassword);
    };
});

App.controller('HomeController', function ($scope, AccountResource) {
    $scope.accounts = [];
    getAccounts();

    $scope.deleteAccount = function(id) {
        AccountResource.deleteAccountById(id).then( function (res) {
            var index = $scope.accounts.indexOf(res.data);
            $scope.accounts.splice(index, 1);  
        });
    };

    function getAccounts() {
        AccountResource.getAccounts().then(function (accounts) {
            $scope.accounts = accounts.data;
        }, function (error) {
            $scope.status = 'Unable to load account data: ' + error.message;
        });
    }
});

App.controller('EditController', function ($scope, AccountResource, $route) {
    this.myDate = new Date();
    this.isOpen = false;

    var editAccountId = $route.current.params.id;

    $scope.updateStatus = false;
    $scope.updateAccountLoading = false;

    AccountResource.getAccountById(editAccountId).then(function (account) {
        loadAccount(account.data);
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
        $scope.updateAccountLoading = true;
        AccountResource.updateAccount($scope.account).then(function (res) {
            $scope.account = res.data;
            $scope.updateStatus = true;
            $scope.updateAccountLoading = false;
        }, function (error) {
            $scope.status = 'Error occured on updating new account';
        });
    };

    $scope.dobChanged = function() {
        $scope.account.DateOfBirth.setMinutes(($scope.account.DateOfBirth.getTimezoneOffset() * -1));
    };

});

App.controller('CreateController', function ($scope, AccountResource, $window) {
    $scope.account = {};
    $scope.errorUpdate = false;

    $scope.addAccount = function () {
        $scope.errorUpdate = false;
        if($scope.passwordComplexValidationFailed) {
            return;
        }
        AccountResource.addAccount($scope.account).then(function (res) {
            $window.location.href = '/';
        }, function (error) {
            $scope.errorUpdate = true;
            $scope.status = error.data.ModelState.error[0];
        });
    };

    $scope.passwordChanged = function() {
        var passwordComplexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([@$!%*?&]*)[A-Za-z\d@$!%*?&]{8,}/;
        $scope.passwordComplexValidationFailed = !passwordComplexRegex.test($scope.account.Password);
    };

    $scope.dobChanged = function() {
        $scope.account.DateOfBirth.setMinutes(($scope.account.DateOfBirth.getTimezoneOffset() * -1));
    };
});