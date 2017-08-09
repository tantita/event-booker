var expositionAppControllers = angular.module('expositionAppControllers', [
    'expositionAppServices'
]);

expositionAppControllers.controller('MainController', ['$scope','$route', '$location', 'userService', 'eventService', 'uiGmapGoogleMapApi', function ($scope, $route, $location, userService, eventService, uiGmapGoogleMapApi) {

    $scope.logout = function(){
        userService.logout();
        $route.reload();
    }

    angular.extend($scope, {
        map: {
            center: {
                latitude: 6.4638088,
                longitude:3.4042751
            },
            zoom: 11,
            markers: [],
             options :[]
        }
    });


    $scope.bookYourPlace = function () {
       $location.path('/events/'+ $scope.currentEventId);
    }

    $scope.refresh = function(){

        eventService.getAll(function(response){

            $scope.events = response;
            angular.forEach($scope.events, function(item, key) {
                var marker = {
                    id: item.id,
                    coords: {
                        latitude: item.lat,
                        longitude: item.long
                    },
                    click: function(marker, eventName, model, arguments) {
                        $scope.currentEventTitle = item.title;
                        $scope.currentEventStartDate = item.start_date;
                        $scope.currentEventEndDate = item.end_date;
                        $scope.currentEventLocation = item.location;
                        $scope.currentEventId = item.id;
                    }
                };
                $scope.map.markers.push(marker);
            });

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }
    $scope.currentEventTitle = '';
    $scope.currentEventId = '';
    $scope.currentEventStartDate = "";
    $scope.currentEventEndDate = "";
    $scope.currentEventLocation = "";

    uiGmapGoogleMapApi.then(function(maps) {
       // alert("done");
    });




    if(!userService.checkIfLoggedIn())
        $scope.userLoggedIn = true;

    $scope.events = [];
    $scope.refresh();

}]);

expositionAppControllers.controller('EventController', ['$scope','$window', '$location','$routeParams', 'userService', 'eventService', function ($scope, $window, $location, $routeParams, userService, eventService) {

    $scope.logout = function(){
        userService.logout();
        $location.path('/');
    }

    $scope.load = function(eventId){

        eventService.getById(eventId, function(response){

            $scope.stands = response;
            $scope.currentEventTitle = response[0].title;

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.showSignupform = function (){
        $('#loginModel').modal('toggle');
        $('#signupModel').modal('toggle');
    }

   $scope.login = function() {
        userService.login(
            $scope.email, $scope.password,
            function(response){
                $('#loginModel').modal('toggle');
                $scope.userLoggedIn = true;
                $window.location.reload();
            },
            function(response){
                alert('Something went wrong with the login process. Try again later!');
            }
        );
    }

    $scope.signup = function() {
        userService.signup(
            $scope.name, $scope.email, $scope.password,
            function(response){
                alert('Great! You are now signed in! Welcome, ' + $scope.name + '!');
                $('#signupModel').modal('toggle');
                $window.location.reload();
            },
            function(response){
                alert('Something went wrong with the signup process. Try again later.');
            }
        );
    }

    $scope.name = '';
    $scope.email = '';
    $scope.password = '';

    /*if(userService.checkIfLoggedIn())
        $location.path('/');*/

    $scope.loadStand = function(stand){

        $scope.currentStandCode = stand.code;
        $scope.currentStandPrice = stand.price;
        $scope.currentStandRealImage = stand.real_image;
        $scope.currentStandId = stand.id;
        if(stand.email){
            // if(!userService.checkIfLoggedIn()){
            //     $('#loginModel').modal('toggle');
            // } else {
                $scope.currentStandEmail = stand.email;
                $scope.currentStandAddress = stand.address;
                $scope.currentStandPhone = stand.phone;
                $scope.currentStandLogo = stand.logo;
                if (stand.documents) {
                    $scope.currentStandDocuments = stand.documents.split(',');
                }
                $('#viewStandModel').modal('toggle');
                // eventService.createVisit({
                //     stand_id: $scope.currentStandId
                // }, function(){
                //     //no need to alert users that we are tracking.
                // }, function(){
                //     //no need to alert users that we are tracking.
                //     //alert('Some errors occurred while communicating with the service. Try again later.');
                // });
            // }
        } else {
            $('#reserveStandModel').modal('toggle');
        }

    }

    $scope.reserve = function(standId){

        $('#reserveStandModel').modal('toggle');
        $location.path('/stands/'+standId);

    }

    $scope.currentStandReset = function(){
        $scope.currentStandCode = '';
        $scope.currentStandPrice = '';
        $scope.currentStandRealImage = '';
        $scope.currentStandId = '';
        $scope.currentStandEmail = "";
        $scope.currentStandAddress = "";
        $scope.currentStandPhone = "";
        $scope.currentStandLogo = "";
        $scope.currentStandDocuments = [];

    }

    $scope.currentEventTitle = '';
    if(!userService.checkIfLoggedIn())
        $scope.userLoggedIn = true;

    $scope.stands = [];
    $scope.eventId = $routeParams.eventId;
    $scope.load($routeParams.eventId);

}]);

expositionAppControllers.controller('StandController',
    ['$scope', '$location','$routeParams', 'userService', 'eventService', 'Upload', '$timeout',
        function ($scope, $location, $routeParams, userService, eventService, Upload, $timeout) {

    $scope.logout = function(){
        userService.logout();
        $location.path('/');
    }

    $scope.stand = function(standId){
        $location.path('/events/'+standId);
    }
    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'api/uploads',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }

    $scope.uploadDocuments = function(files, errFiles) {
        $scope.documents = files;
        $scope.errDocuments = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: 'api/uploads',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsgDocuments = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        });
    }

    $scope.load = function(standId){
        // console.log(standId)
        eventService.getStandById(standId, function(response){
            // console.log(response)
            $scope.currentStand = response;
            $scope.currentStandId = standId;
            $scope.currentEventId = $scope.currentStand.event_id;

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.save = function(){
        // console.log($scope.currentEventId);

        $scope.marketing=[];
        angular.forEach($scope.documents, function(file) {
            $scope.marketing.push(file.name);
        });
        if(typeof $scope.f == 'undefined'){
            alert("Please select company logo");
            return false;
        }

        if($scope.address == "" || typeof $scope.address == 'undefined' ||
            $scope.phone == "" || typeof $scope.phone == 'undefined' ||
            $scope.email == "" || typeof $scope.email == 'undefined' ||
            $scope.companyAdminEmail == "" || typeof $scope.companyAdminEmail == 'undefined'
        ){
            alert("Please check and complete all fields correctly.");
            return false;
        }

       eventService.createBooking({
            company_admin_email: $scope.companyAdminEmail,
            logo: $scope.f.name,
            address: $scope.address,
            email: $scope.email,
            phone: $scope.phone,
            documents: $scope.marketing.join(','),
            stand_id: $scope.currentStandId
        }, function(){
            alert("Congratulations, Your booking has been done successfully.");
            $location.path('/events/'+ $scope.currentEventId);

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    if(!userService.checkIfLoggedIn())
     $scope.userLoggedIn = true;

    $scope.currentStand = [];
    $scope.currentStandId = "";
    $scope.currentEventId = "";
    $scope.load($routeParams.standId);

}]);