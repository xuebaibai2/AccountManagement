App.controller('HomeController', function ($scope, AccountResource) {
    $scope.accounts = [];
    getAccounts();

    $scope.deleteAccount = function (id) {
        AccountResource.deleteAccountById(id).then(function (res) {
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