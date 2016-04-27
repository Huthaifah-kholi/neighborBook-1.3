angular.module('app.controllers')

.controller('signInCtrl',function($scope, $state ,AuthService) {

  $scope.login = function (data) {
  	
    var a = {};
    a["userId"]=data.email;
    a["password"]=data.password;
    var dataToSend= JSON.stringify(a);
    console.log(dataToSend);//check what you send
    localStorage.setItem('dataNeeded',dataToSend);
   ////////////////////////// must delete to make auth
    AuthService.login();
  }

})
