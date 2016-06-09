'use strict';

/**
 * @ngdoc overview
 * @name scalcApp
 * @description
 * # scalcApp
 *
 * Main module of the application.
 */
angular
  .module('scalcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/usage.html',
        controller: 'UsageCtrl',
        controllerAs: 'usage'
      })
      .when('/specs/:isStream/:isBatch/:isAPI/:isDatastore', {
        templateUrl: 'views/specs.html',
        controller: 'SpecsCtrl',
        controllerAs: 'specs'
      })
      .when('/recommendation', {
        templateUrl: 'views/recommendation.html',
        controller: 'RecCtrl',
        controllerAs: 'rec'
      })
      .otherwise({
        // redirectTo: '/'
      });
  });
