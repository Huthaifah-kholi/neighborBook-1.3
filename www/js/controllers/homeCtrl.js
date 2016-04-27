angular.module('app.controllers')
.controller('homeCtrl', function($scope ,$http, $ionicPopup,ApiEndPoint,$state) {

  $scope.$on('$ionicView.enter', function() {

    // code to run each time view is entered
    $scope.categories=['DVDS',
        'SPORTS & FITNESS',
        'COMPUTER GAMES',
        'BOCKS',
        'CLOTHING',
        'BEAUTY & HEALTHCARE',
        'TOYS, KIDS & BABIES',
        'BOOKS',
        'GARDEN EQUIPMENT',
        'FURNITURE',
        'ELECTRICAL',
        'OTHERS'];

  var dataNeedTOSend = localStorage.getItem('dataNeeded');
  console.log("tha data that requered to send");
  console.log(dataNeedTOSend);

  var returnedStuff=[];
  var unreturnedStuff=[];
  var skills=[];
  $scope.firstShownReturenedStuff=[];
  $scope.firstShownUnreturenedStuff=[];
  $scope.firstShownSkills=[];
  
  $http.post( ApiEndPoint+"/stuff",dataNeedTOSend).success(function(response){
    console.log("the JSON from server");
    console.log(response);
    var stuff=[];
    stuff=response.stuff;
    console.log(response.stuff);
    skills=response.skills;
    console.log("the skills after it recived from server");
    console.log(skills);//check if the stuff set in my local variable
    var newURLForImage=ApiEndPoint+"/uploaded-images/";
    var newURLForImage1=ApiEndPoint+"/skills/";

    // console.log("the correct url for image");
    // console.log(newURLForImage);
    var oldURLForSkillsImage="";
    var oldURLForStuffImage="";

    console.log("t1");//////************************** test ********************************

      for (var i = skills.length - 1; i >= 0; i--) {
            console.log("t2");//////************************** test ********************************

        oldURLForSkillsImage=skills[i].imageSkill;
        skills[i].image=newURLForImage1+oldURLForSkillsImage;
        skills[i].distance=Math.floor(skills[i].distance*1000);
        // if(skills[i].distance>1000){
        //   skills[i].distance/=1000;
        // }
      }
      for (var i = (stuff.length - 1); i >= 0; i--) {
    console.log("t3");//////************************** test ********************************

        oldURLForStuffImage=stuff[i].image;

        stuff[i].image=newURLForImage+oldURLForStuffImage;
        stuff[i].distance=Math.floor(stuff[i].distance*1000);
        // if(stuff[i].distance>1000){
        //   stuff[i].distance/=1000;
        // }
        if(stuff[i].type=="forfree"){
          unreturnedStuff.push(stuff[i]);
        }
        else if(stuff[i].type=="fordate"){
          returnedStuff.push(stuff[i]);
        }
      }


    // console.log("afeter separate the stuff retunred & unreturned & skills");
    // console.log(returnedStuff);
    // console.log(unreturnedStuff);
    // console.log(skills);
    // console.log("befor the loop that creat the first show");
      for (var i = 0; i < 4; i++) {
            console.log("t4");//////************************** test ********************************

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
          console.log("t5");//////************************** test ********************************

        $scope.allReturnedStuff=returnedStuff;
        $scope.allUnreturnedStuff=unreturnedStuff;
        $scope.allSkills=skills;
        //firstUnreturenedStuff
      /*  console.log("firstShownUnReturenedStuff:");
        console.log(  $scope.firstShownUnreturenedStuff);
        // allUnreturnedStuff
        console.log("allUnreturnedStuff:");
        console.log($scope.allUnreturnedStuff);
  // console.log("allreturnedStuff:");
  // console.log($scope.allReturnedStuff);*/




    // var s=$scope.firstShownReturenedStuff;
    // console.log("the value in of first retunred stuff 'AFTER LOOP'");
    // console.log(s);
          })
          .error(function(response){
            var alertPopup = $ionicPopup.alert({
            title: 'ERROR while connection',
            template: 'there is an Error please try again'
      });
          });
});
})
