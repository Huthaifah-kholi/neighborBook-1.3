angular.module('app.controllers')

.controller('skillCtrl',function($scope,AuthService, Camera,$http,$ionicPopup,
  ApiEndPoint,$timeout,$cordovaFile,$cordovaFileTransfer,$ionicActionSheet,$timeout) {

    $scope.date= new Date(); ////////////////////////////////////??????????????????
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
  
        

     // Triggered on a button click, or some other target
 $scope.showActionSheet = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     titleText: '<b>Take photo from ...</b>',
     buttons: [
       { text: '<div class="custome-dark"><i class="icon ion-camera"></i>Camera</div> ' },
       { text: '<div class="custome-dark"><i class="icon ion-image"></i>Gallary</div> ' }
     ],
     cancelText: 'Cancel',
     cancel: function() {
          console.log("cancel");
          hideSheet();
        },
     buttonClicked: function(index) {
        if(index==0){
          getPhoto();

        }
        else if(index==1){
          getPhotoGallary();
        }
                  hideSheet();
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

 };

    //from Camera
    getPhoto= function() {
      var cameraOption={
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: true
      };
      Camera.getPicture(cameraOption).then(function(imageURI) {
        // console.log(imageURI);
        // urlForImage=imageURI;
        // var filename = imageURI.split("/").pop();
        // var alertPopup = $ionicPopup.alert({
        // title: filename,
        // template: imageURI
        //  });
       
        $scope.lastPhoto= imageURI;
      }, function(err) {
        // console.err(err);
      } );
  };

    //from Gallary
    getPhotoGallary= function() {
      var GallaryOption={
        quality : 75,
        targetWidth: 320,
        targetHeight: 320,
        sourceType: 2
      };
      Camera.getPicture(GallaryOption).then(function(imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function(err) {
        console.err(err);
      });
  };

 
})