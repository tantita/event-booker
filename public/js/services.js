var expositionAppServices = angular.module('expositionAppServices', [
    'LocalStorageModule',
    'restangular'
]);

expositionAppServices.factory('userService', ['$http', 'localStorageService', function($http, localStorageService) {

    function checkIfLoggedIn() {

        if(localStorageService.get('token'))
            return true;
        else
            return false;

    }

    function signup(name, email, password, onSuccess, onError) {

        $http.post('/api/auth/signup',
            {
                name: name,
                email: email,
                password: password
            }).
        then(function(response) {

            localStorageService.set('token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function login(email, password, onSuccess, onError){

        $http.post('/api/auth/login',
            {
                email: email,
                password: password
            }).
        then(function(response) {

            localStorageService.set('token', response.data.token);
            onSuccess(response);

        }, function(response) {

            onError(response);

        });

    }

    function logout(){

        localStorageService.remove('token');

    }

    function getCurrentToken(){
        return localStorageService.get('token');
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        logout: logout,
        getCurrentToken: getCurrentToken
    }

}]);

expositionAppServices.factory('eventService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/events').getList().then(function(response){
            onSuccess(response);

        }, function(){

            onError(response);

        });
    }

    function getById(eventId, onSuccess, onError){
        Restangular.one('api/events', eventId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function getStandById(standId, onSuccess, onError){
        Restangular.one('api/stand', standId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function createBooking(data, onSuccess, onError){

        Restangular.all('api/booking').post(data).then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    // function createVisit(data, onSuccess, onError){
    //     Restangular.all('api/visit').post(data).then(function(response){

    //         onSuccess(response);

    //     }, function(response){

    //         onError(response);

    //     });

    // }

    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        getAll: getAll,
        getById: getById,
        getStandById: getStandById,
        createBooking: createBooking,
        // createVisit: createVisit
    }

}]);