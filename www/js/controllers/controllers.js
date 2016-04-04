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

.controller('homeCtrl', function($scope , sharedProperties,$http, $ionicPopup,ApiEndPoint) {
  var dataNeedTOSend = localStorage.getItem('dataNeeded');
  // console.log("tha data that requered to send");
  // console.log(dataNeedTOSend);
  var returnedStuff=[];
  var unreturnedStuff=[];
  var skills=[];
  $scope.firstShownReturenedStuff=[];
  $scope.firstShownUnreturenedStuff=[];
  $scope.firstShownSkills=[];
  $http.post( ApiEndPoint+"/stuff",dataNeedTOSend).success(function(response){
    console.log("the JSON from server"); 
    console.log(""+response); 
    var stuff=[];
    stuff=response.stuff;
    // console.log(response.stuff); 
    skills=response.skills;
    console.log("the skills after it recived from server");
    console.log(skills);//check if the stuff set in my local variable
    var newURLForImage=ApiEndPoint+"/uploaded-images/";
    var newURLForImage1=ApiEndPoint+"/skills/";

    console.log("the correct url for image");
    console.log(newURLForImage);
    var oldURLForSkillsImage="";
    var oldURLForStuffImage="";

      for (var i = skills.length - 1; i >= 0; i--) {
        oldURLForSkillsImage=skills[i].imageSkill;
        skills[i].image=newURLForImage1+oldURLForSkillsImage;
        skills[i].distance=floor(skills.distance*1000);
      }
      for (var i = (stuff.length - 1); i >= 0; i--) {

        oldURLForStuffImage=stuff[i].image;

        stuff[i].image=newURLForImage+oldURLForStuffImage;
        stuff[i].distance=floor(stuff.distance*1000);
        if(stuff[i].type=="forfree"){
          unreturnedStuff.push(stuff[i]);
        }
        else if(stuff[i].type=="fordate"){
          returnedStuff.push(stuff[i]);
        }
      }

      
    console.log("afeter separate the stuff retunred & unreturned & skills");
    console.log(returnedStuff); 
    console.log(unreturnedStuff); 
    console.log(skills); 
    console.log("befor the loop that creat the first show");
      for (var i = 4; i >= 0; i--) {
        if(!(returnedStuff[i]==undefined)){
          $scope.firstShownReturenedStuff.push(returnedStuff[i]);
        }
          
        if (!(unreturnedStuff[i]==undefined)) {
          $scope.firstShownUnreturenedStuff.push(unreturnedStuff[i]);
        }

        if (!(skills[i]==undefined)) {
         $scope.firstShownSkills.push(skills[i]);
        }
      }
    var s=$scope.firstShownReturenedStuff;
    console.log("the value in of first retunred stuff 'AFTER LOOP'");
    console.log(s);
          })
          .error(function(response){
            var alertPopup = $ionicPopup.alert({
            title: 'ERROR while connection',
            template: 'there is an Error please try again'
      });
          });
	/*$scope.returnedStuff=sharedProperties.getReturnedStuff();
  $scope.unreturnedStuff=sharedProperties.getUnreturnedStuff();
  $scope.skills=sharedProperties.getSkills();
  $scope.dataToSend=sharedProperties.getRequestData();
  //declare variable that show us the first shown products
  $scope.firstShownReturenedStuff=[];
  $scope.firstShownUnreturenedStuff=[];
	$scope.firstShownSkills=[];
  var ss=($scope.returnedStuff[0]!==undefined);*/

  
})

.controller('signInCtrl',function($scope, $state, $ionicPopup,sharedProperties, AuthService,$http,ApiEndPoint) {

  $scope.login = function (data) {
    var a = {};
    a["userId"]=data.email;
    a["password"]=data.password;
    var dataToSend= JSON.stringify(a);
    console.log(dataToSend);//check what you send 
    localStorage.setItem('dataNeeded',dataToSend);

     $http.post(ApiEndPoint+"/authcheck",dataToSend).success(function(response){
      if(response=="ok"){
         
         sharedProperties.setRequestData(dataToSend);
         $state.go("menu.home"); 
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

