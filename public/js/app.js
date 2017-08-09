/*var bookWishlistApp = angular.module('bookWishlistApp', [
    'ngRoute',
    'bookWishlistAppControllers'
]);

bookWishlistApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).
    when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupController'
    }).
    when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
    }).
    otherwise({
        redirectTo: '/'
    });

}]);*/

var expositionApp = angular.module('expositionApp', [
    'ngRoute',
    'ngFileUpload',
    'ngMessages',
    'expositionAppControllers',
    'uiGmapgoogle-maps'
]).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBQ4G5mHSISw21LB-BM3sC6ww8j7jICSsM',
        v: '3.24', //defaults to latest 3.X anyhow
    });
});

expositionApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
    when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
    }).
    when('/events/:eventId', {
        templateUrl: 'partials/event.html',
        controller: 'EventController'
    }).
    when('/stands/:standId', {
        templateUrl: 'partials/stand.html',
        controller: 'StandController'
    }).
    otherwise({
        redirectTo: '/'
    });

}]);

expositionApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);