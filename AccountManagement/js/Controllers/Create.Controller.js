App.controller('CreateController', function ($scope, AccountResource, $window) {
    $scope.account = {};
    $scope.errorUpdate = false;

    $scope.addAccount = function () {
        $scope.errorUpdate = false;
        if ($scope.passwordComplexValidationFailed) {
            return;
        }
        if (/\s/.test($scope.account.Username)) {
            $scope.errorUpdate = true;
            $scope.status = "Username should not contain any white space";
            return;
        }else {
            $scope.errorUpdate = false;
            $scope.status = "";
        }
        AccountResource.addAccount($scope.account).then(function (res) {
            $window.location.href = '/';
        }, function (error) {
            $scope.errorUpdate = true;
            $scope.status = error.data.ModelState.error[0];
        });
    };

    $scope.passwordChanged = function () {
        var passwordComplexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([@$!%*?&]*)[A-Za-z\d@$!%*?&]{8,}/;
        $scope.passwordComplexValidationFailed = !passwordComplexRegex.test($scope.account.Password);
    };

    $scope.dobChanged = function () {
        $scope.account.DateOfBirth.setMinutes(($scope.account.DateOfBirth.getTimezoneOffset() * -1));
    };
});