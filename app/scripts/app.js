'use strict';

/**
 * @ngdoc overview
 * @name foundersMapQuestApp
 * @description
 * # foundersMapQuestApp
 *
 * Main module of the application.
 */
angular
    .module('foundersMapQuestApp', [
        'ngAnimate',
        'ngMessages',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMap',
        'LocalStorageModule',
    ])
    .config(function ($routeProvider, localStorageServiceProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/load-data', {
                templateUrl: 'views/load-data.html',
                controller: 'LoadDataCtrl',
                controllerAs: 'ctrl'
            })
            .when('/review-fields/:csvCacheId', {
                templateUrl: 'views/reviewfields.html',
                controller: 'ReviewfieldsCtrl',
                controllerAs: 'ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        // Configure LocalStorage
        localStorageServiceProvider.setPrefix('foundersMapQuest');
        localStorageServiceProvider.setStorageType('localStorage');
    })
    .run(function($rootScope, $route) {
        $rootScope.$route = $route;
    });
