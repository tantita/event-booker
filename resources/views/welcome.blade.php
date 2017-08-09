
<!DOCTYPE html>
<html lang="en" ng-app="expositionApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Virtual Exposition Application</title>

    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/app.css" rel="stylesheet">

    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/lodash/lodash.js"></script>
    <script src="bower_components/angular-route/angular-route.min.js"></script>
    <script src="bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>
    <script src="bower_components/restangular/dist/restangular.min.js"></script>
    <script src='bower_components/angular-simple-logger/dist/angular-simple-logger.min.js'></script>
    <script src='bower_components/angular-google-maps/dist/angular-google-maps.min.js'></script>
    <script src='bower_components/ng-file-upload-shim/ng-file-upload-shim.min.js'></script>
    <script src='bower_components/ng-file-upload/ng-file-upload.min.js'></script>
    <script src='bower_components/angular-messages/angular-messages.min.js'></script>

    <script src="js/app.js"></script>
    <script src="js/controllers.js?version=5"></script>
    <script src="js/services.js?version=5"></script>

    <!-- Add to home screen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Weather PWA">
    <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">

    <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
    <meta name="msapplication-TileColor" content="#2F3BA2">

    <link rel="manifest" href="manifest.json">

</head>

<body>
<div class="container">
    <div class="row">
        <a href="#/"><h1>Crossover Virtual Exposition Application</h1></a>
        <div ng-view></div>
    </div>
    <hr>
    <div class="row">Crossover Virtual Exposition Application : 2017</div>
</div>

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>