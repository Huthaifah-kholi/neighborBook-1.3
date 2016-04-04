angular.module('app.controllers', ['app.routes', 'app.services'])
  
 .controller('AppCtrl', function($scope,$ionicPopup, $state, AuthService) {

})

.controller('stuffCtrl',function($scope) {

})

.controller('addCtrl',function($scope){

  
})

.controller('skillCtrl',function($scope) {

})
   
.controller('pickCtrl', function($scope) {

})

.controller('signUpCtrl', function($scope) {

})

.controller('homeCtrl', function($scope , sharedProperties) {
	var ss=$scope.unreturnedStuff;
	console.log("inside home ctrl : "+ss);

})

.controller('signInCtrl',function($scope, $state, $ionicPopup,sharedProperties, AuthService,$http,ApiEndPoint) {
  var returnedStuff=[];
  var unreturnedStuff=[];
  var skills=[];
  $scope.login = function (data) {
    var a = {};
    a["userId"]=data.email;
    a["password"]=data.password;
    var dataToSend= JSON.stringify(a);
    console.log(dataToSend);//check what you send 
     $http.post(ApiEndPoint+"/authcheck",dataToSend).success(function(response){
      if(response=="ok"){
       $http.post( ApiEndPoint+"/stuff",dataToSend).success(function(response){
       	 console.log("the JSON is now available"); 
            var stuff=[];
            stuff=response.stuff;
            skills=response.skills;
            // console.log(stuff);//check if the stuff set in my local variable
            for (var i = stuff.length - 1; i >= 0; i--) {
              if(stuff[i].type=="forfree"){
                unreturnedStuff.push(stuff[i]);
              }
              else{
                returnedStuff.push(stuff[i]);
              }
            }

           
            sharedProperties.setSkills(skills);
            sharedProperties.setUnreturnedStuff(unreturnedStuff);
            sharedProperties.setReturnedStuff(returnedStuff);
            sharedProperties.setRequestData(dataToSend);
            
            $state.go("menu.home");      
          })
          .error(function(response){
            var alertPopup = $ionicPopup.alert({
            title: 'ERROR while connection',
            template: 'there is an Error please try again'
      });
          });
      }
      else{
        var alertPopup = $ionicPopup.alert({
        title: 'Check your data',
        template: 'Sorry, check your email and password'
      });
      }
     })
    .error(function(resp){
       var alertPopup = $ionicPopup.alert({
        title: 'Check your Connection',
        template: 'Sorry, check your connection and try again'
      })
    });
      
     

  }

})

