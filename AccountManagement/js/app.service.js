﻿var AccountService = angular.module('AccountService', []);

AccountService.factory('AccountResource', function ($http){
    var baseUrl = "https://accountmanagementpractice.azurewebsites.net/api/users/";
    var baseUrlDev = "http://localhost:28308/api/users/";
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
        return $http.put(baseUrl + account.UserId, account);
    };

    AccountResource.deleteAccountById = function(accountId) {
        return $http.delete(baseUrl + accountId);
    };

    AccountResource.resetPasswordById = function(accountId, newPassword) {
        return $http.put(baseUrl + 'resetpass/' + accountId + '/'+ newPassword);
    }

    return AccountResource;
});
