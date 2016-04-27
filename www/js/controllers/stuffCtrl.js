angular.module('app.controllers')

.controller('stuffCtrl',function($scope,AuthService, Camera,$http,$ionicPopup,
  ApiEndPoint,$timeout,$cordovaFile,$cordovaFileTransfer,$ionicActionSheet,$timeout) {

    $scope.date= new Date();////////////////////////////////////??????????????????
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

 

     $scope.postStuff=function(stuff){
        
        if(stuff==null || (stuff.category==undefined || stuff.name==undefined || stuff.type==undefined || stuff.details==undefined)
            ||(stuff.category=="" || stuff.name=="" || stuff.type=="" || stuff.details=="")){
            var alertPopup = $ionicPopup.alert({
            title: 'Some required field is empty',
            template: 'Please check fields '
             });
        }
        
        else{
        var newStuffToadd={};
        newStuffToadd["name"]=stuff.name;
        newStuffToadd["category"]=stuff.category;
        newStuffToadd["type"]=stuff.type;
        if(stuff.type=="forfree"){
            stuff.date=new Date();

          // stuff.date
        }
        var ss=(stuff.date).split(":");
        newStuffToadd["date"]=stuff.date;
        newStuffToadd["details"]=stuff.details;
        var newStuffJSON= JSON.stringify(newStuffToadd);
        console.log(newStuffJSON);



       
        AuthService.login().then(function(){
          // Destination URL, you can use other technologies beside PHP
          var url = ApiEndPoint + "";

          //File for Upload
          var targetPath = $scope.lastPhoto;

          // File name only
          var filename = targetPath.split("/").pop();
          var uploadFileOptions = {
              fileKey: "img",
              fileName: filename,
              chunkedMode: false,
              mimeType: "image/png"
          };

          $cordovaFileTransfer.upload(url, targetPath, uploadFileOptions).success(function(response){
            var alertPopup = $ionicPopup.alert({
            title: 'upload image done',
            template: 'done'
             });
            $http.post(ApiEndPoint+"", newStuffJSON).success(function(res){
              var alertPopup = $ionicPopup.alert({
            title: 'upload image && stuff done',
            template: 'done'
             });
            })
            .error(function(res){
              var alertPopup = $ionicPopup.alert({
            title: 'ERROR in upload stuff',
            template: 'NOT DONE !!'
             });
            });
          })
          .error(function(response){
            var alertPopup = $ionicPopup.alert({
            title: 'upload image done',
            template: 'done'
             });
          });

        });
    }//else

     };

})
