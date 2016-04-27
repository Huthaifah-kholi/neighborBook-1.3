angular.module('app.services', ['app.controllers', 'app.routes'])

 .service('AuthService', ["$http","ApiEndPoint","$ionicPopup","$state", function($http,ApiEndPoint,$ionicPopup,$state){
  return {
    login : function(){
      var data=  localStorage.getItem('dataNeeded');

    //   var alertPopup = $ionicPopup.alert({
    //     title: 'data in local storage',
    //     template: data
    // });
// if(data!==undefined){
        $http.post(ApiEndPoint+"/authcheck",data).success(function(response){
          if(response=="ok"){
            $state.go("menu.home");
          }
          else{
            var  alertPopup = $ionicPopup.alert({
              title: 'Check your data',
              template: 'Sorry, check your email and password'
          });
          }
       })
        .error(function(response){
          var alertPopup = $ionicPopup.alert({
            title: 'Check your Connection',
            template: 'Sorry, check your connection and try again'
          })
        });

    // }
    // else {

    // }
  }}

}]);
