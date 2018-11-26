var AccountService = angular.module('AccountService', []);

AccountService.factory('AccountResource', function ($http){
    var baseUrlProd = "http://demo5365007.mockable.io/accounts/";
    var baseUrl = "http://localhost:28308/api/users/";
    var AccountResource = {};

    AccountResource.getAccounts = function() {
        return $http.get(baseUrl);
    };

    AccountResource.getAccountById = function(accountId) {
        return $http.get(baseUrl + accountId);
    };

    AccountResource.addAccount = function(account) {
        return $http.post(baseUrl, account);
    };

    AccountResource.updateAccount = function(account) {
        return $http.put(baseUrl + account.Id, account);
    };

    AccountResource.deleteAccountById = function(accountid) {
        return $http.delete(baseUrl + accountid);
    };

    return AccountResource;
});
