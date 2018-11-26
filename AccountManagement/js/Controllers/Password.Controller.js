App.controller('PasswordController', function ($scope, AccountResource, $route) {
    $scope.updateStatus = false;
    var editAccountId = $route.current.params.id;
    $scope.newPassword = '';
    $scope.resetBtnClicked = function () {
        AccountResource.resetPasswordById(editAccountId, $scope.newPassword).then(function (res) {
            $scope.updateStatus = true;
        });
    };
    $scope.passwordChanged = function () {
        var passwordComplexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([@$!%*?&]*)[A-Za-z\d@$!%*?&]{8,}/;
        $scope.passwordComplexValidationFailed = !passwordComplexRegex.test($scope.newPassword);
    };
});