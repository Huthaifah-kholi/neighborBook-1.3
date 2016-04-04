angular.module('app.services', ['app.controllers', 'app.routes'])

 .service('AuthService', ["$http", function($http){
/*  var returnedStuff=[];
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
      
     

  }*/
  }]);
