var AccountService = angular.module('AccountService', []);

AccountService.factory('AccountResource', function ($http){
    var baseUrl = "http://demo5365007.mockable.io";
    var AccountResource = {};

    AccountResource.getAccounts = function() {
        return $http.get(baseUrl + '/accounts');
    };

    AccountResource.getAccountById = function(accountId) {
        return $http.get(baseUrl + '/accounts/' + accountId);
    };

    AccountResource.addAccount = function(account) {
        return $http.post(baseUrl + '/accounts', account);
    };

    AccountResource.updateAccount = function(account) {
        return $http.put(baseUrl + '/accounts/' + account.Id, account);
    };

    return AccountResource;
});
