var AccountService = angular.module('AccountService', []);

AccountService.factory('AccountResource', function ($http){
    var baseUrl = "http://demo5365007.mockable.io";
    var AccountResource = {};

    AccountResource.getAccounts = function() {
        return $http.get(baseUrl + '/accounts');
    };

    AccountResource.addAccount = function(account) {
        return $http.post(baseUrl + '/accounts', account);
    };

    return AccountResource;
});
