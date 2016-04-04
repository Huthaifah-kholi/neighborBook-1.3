angular.module('app.services')
.service('sharedProperties', function () {
        var returnedStuff =[];
        var unreturnedStuff=[];
        var skills=[];
        var requestData;
        return {
            getSkills: function () {
                return skills;
            },
            setSkills: function(value) {
                skills = value;
                /*console.log("the value of skills inside setSkills function");
                console.log(skills);*/
            },
            getUnreturnedStuff: function () {
                return unreturnedStuff;
            },
            setUnreturnedStuff: function(value) {
                unreturnedStuff = value;
            },
            getReturnedStuff: function () {
                return returnedStuff;
            },
            setReturnedStuff: function(value) {
                returnedStuff = value;
            },
            getRequestData: function () {
                return requestData;
            },
            setRequestData: function(value) {
                requestData = value;
            },            
            print:function(){
            	console.log("valuse at sharServics:");
            	console.log(returnedStuff);
            	console.log(unreturnedStuff);
            	console.log(skills);
            	console.log(requestData);
            	
            }
        };
    });