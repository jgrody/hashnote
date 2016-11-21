(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('app', [
  'ionic',
  'app.controllers',
  'app.routes',
  'app.directives',
  'app.services',
  'firebase',
  'firebaseConfig',
  'app.filters',
  'ngSanitize',
])

.config(["$ionicConfigProvider", "$sceDelegateProvider", "$animateProvider", function($ionicConfigProvider, $sceDelegateProvider, $animateProvider){
  "ngInject";

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  $animateProvider.classNameFilter(/angular-animate/);
}])

.run(["$ionicPlatform", "$state", "$rootScope", function($ionicPlatform, $state, $rootScope) {
  "ngInject";

  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      $rootScope.user = user;
      $state.go('tabsController.notes');
      // User is signed in.
    } else {
      $state.go('tabsController.login');
      // No user is signed in.
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.directive('disableSideMenuDrag', ["$ionicSideMenuDelegate", "$rootScope", function($ionicSideMenuDelegate, $rootScope) {
  "ngInject";

  return {
    restrict: "A",
    controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
      "ngInject";

      function stopDrag(){
        $ionicSideMenuDelegate.canDragContent(false);
      }

      function allowDrag(){
        $ionicSideMenuDelegate.canDragContent(true);
      }

      $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
      $element.on('touchstart', stopDrag);
      $element.on('touchend', allowDrag);
      $element.on('mousedown', stopDrag);
      $element.on('mouseup', allowDrag);

    }]
  };
}])

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnaW9uaWMnLFxuICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgJ2FwcC5yb3V0ZXMnLFxuICAnYXBwLmRpcmVjdGl2ZXMnLFxuICAnYXBwLnNlcnZpY2VzJyxcbiAgJ2ZpcmViYXNlJyxcbiAgJ2ZpcmViYXNlQ29uZmlnJyxcbiAgJ2FwcC5maWx0ZXJzJyxcbiAgJ25nU2FuaXRpemUnLFxuXSlcblxuLmNvbmZpZyhmdW5jdGlvbigkaW9uaWNDb25maWdQcm92aWRlciwgJHNjZURlbGVnYXRlUHJvdmlkZXIsICRhbmltYXRlUHJvdmlkZXIpe1xuICBcIm5nSW5qZWN0XCI7XG5cbiAgJHNjZURlbGVnYXRlUHJvdmlkZXIucmVzb3VyY2VVcmxXaGl0ZWxpc3QoWyAnc2VsZicsJyo6Ly93d3cueW91dHViZS5jb20vKionLCAnKjovL3BsYXllci52aW1lby5jb20vdmlkZW8vKionXSk7XG5cbiAgJGFuaW1hdGVQcm92aWRlci5jbGFzc05hbWVGaWx0ZXIoL2FuZ3VsYXItYW5pbWF0ZS8pO1xufSlcblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJHN0YXRlLCAkcm9vdFNjb3BlKSB7XG4gIFwibmdJbmplY3RcIjtcblxuICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBpZiAodXNlciAhPSBudWxsKSB7XG4gICAgICAkcm9vdFNjb3BlLnVzZXIgPSB1c2VyO1xuICAgICAgJHN0YXRlLmdvKCd0YWJzQ29udHJvbGxlci5ub3RlcycpO1xuICAgICAgLy8gVXNlciBpcyBzaWduZWQgaW4uXG4gICAgfSBlbHNlIHtcbiAgICAgICRzdGF0ZS5nbygndGFic0NvbnRyb2xsZXIubG9naW4nKTtcbiAgICAgIC8vIE5vIHVzZXIgaXMgc2lnbmVkIGluLlxuICAgIH1cbiAgfSk7XG5cbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucyAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAvLyBvcmcuYXBhY2hlLmNvcmRvdmEuc3RhdHVzYmFyIHJlcXVpcmVkXG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG5cbi5kaXJlY3RpdmUoJ2Rpc2FibGVTaWRlTWVudURyYWcnLCBmdW5jdGlvbigkaW9uaWNTaWRlTWVudURlbGVnYXRlLCAkcm9vdFNjb3BlKSB7XG4gIFwibmdJbmplY3RcIjtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiBcIkFcIixcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICBcIm5nSW5qZWN0XCI7XG5cbiAgICAgIGZ1bmN0aW9uIHN0b3BEcmFnKCl7XG4gICAgICAgICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhbGxvd0RyYWcoKXtcbiAgICAgICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgJHJvb3RTY29wZS4kb24oJyRpb25pY1NsaWRlcy5zbGlkZUNoYW5nZUVuZCcsIGFsbG93RHJhZyk7XG4gICAgICAkZWxlbWVudC5vbigndG91Y2hzdGFydCcsIHN0b3BEcmFnKTtcbiAgICAgICRlbGVtZW50Lm9uKCd0b3VjaGVuZCcsIGFsbG93RHJhZyk7XG4gICAgICAkZWxlbWVudC5vbignbW91c2Vkb3duJywgc3RvcERyYWcpO1xuICAgICAgJGVsZW1lbnQub24oJ21vdXNldXAnLCBhbGxvd0RyYWcpO1xuXG4gICAgfVxuICB9O1xufSlcbiJdfQ==
