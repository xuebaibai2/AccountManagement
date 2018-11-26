App.controller('EditController', function ($scope, AccountResource, $route) {
    this.myDate = new Date();
    this.isOpen = false;

    var editAccountId = $route.current.params.id;

    $scope.updateStatus = false;
    $scope.updateAccountLoading = false;

    AccountResource.getAccountById(editAccountId).then(function (account) {
        loadAccount(account.data);
    });

    function loadAccount(account) {
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

    $scope.updateAccount = function () {
        $scope.updateAccountLoading = true;
        AccountResource.updateAccount($scope.account).then(function (res) {
            $scope.account = res.data;
            $scope.updateStatus = true;
            $scope.updateAccountLoading = false;
        }, function (error) {
            $scope.status = 'Error occured on updating new account';
        });
    };

    $scope.dobChanged = function () {
        $scope.account.DateOfBirth.setMinutes(($scope.account.DateOfBirth.getTimezoneOffset() * -1));
    };

});