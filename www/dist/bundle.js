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

.config(["$ionicConfigProvider", "$sceDelegateProvider", function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
}])

.run(["$ionicPlatform", "$state", function($ionicPlatform, $state) {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('user', user);
    if (user != null) {
      $state.go('tabsController.notes');
      // User is signed in.
    } else {
      $state.go('login');
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

.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
  return {
    restrict: "A",
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnaW9uaWMnLFxuICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgJ2FwcC5yb3V0ZXMnLFxuICAnYXBwLmRpcmVjdGl2ZXMnLFxuICAnYXBwLnNlcnZpY2VzJyxcbiAgJ2ZpcmViYXNlJyxcbiAgJ2ZpcmViYXNlQ29uZmlnJyxcbiAgJ2FwcC5maWx0ZXJzJyxcbiAgJ25nU2FuaXRpemUnLFxuXSlcblxuLmNvbmZpZyhmdW5jdGlvbigkaW9uaWNDb25maWdQcm92aWRlciwgJHNjZURlbGVnYXRlUHJvdmlkZXIpe1xuICAkc2NlRGVsZWdhdGVQcm92aWRlci5yZXNvdXJjZVVybFdoaXRlbGlzdChbICdzZWxmJywnKjovL3d3dy55b3V0dWJlLmNvbS8qKicsICcqOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8qKiddKTtcbn0pXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRzdGF0ZSkge1xuICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZygndXNlcicsIHVzZXIpO1xuICAgIGlmICh1c2VyICE9IG51bGwpIHtcbiAgICAgICRzdGF0ZS5nbygndGFic0NvbnRyb2xsZXIubm90ZXMnKTtcbiAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxuICAgIH0gZWxzZSB7XG4gICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cbiAgICB9XG4gIH0pO1xuXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgLy8gb3JnLmFwYWNoZS5jb3Jkb3ZhLnN0YXR1c2JhciByZXF1aXJlZFxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuXG4uZGlyZWN0aXZlKCdkaXNhYmxlU2lkZU1lbnVEcmFnJywgWyckaW9uaWNTaWRlTWVudURlbGVnYXRlJywgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkaW9uaWNTaWRlTWVudURlbGVnYXRlLCAkcm9vdFNjb3BlKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6IFwiQVwiLFxuICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRhdHRycycsIGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblxuICAgICAgZnVuY3Rpb24gc3RvcERyYWcoKXtcbiAgICAgICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFsbG93RHJhZygpe1xuICAgICAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpO1xuICAgICAgfVxuXG4gICAgICAkcm9vdFNjb3BlLiRvbignJGlvbmljU2xpZGVzLnNsaWRlQ2hhbmdlRW5kJywgYWxsb3dEcmFnKTtcbiAgICAgICRlbGVtZW50Lm9uKCd0b3VjaHN0YXJ0Jywgc3RvcERyYWcpO1xuICAgICAgJGVsZW1lbnQub24oJ3RvdWNoZW5kJywgYWxsb3dEcmFnKTtcbiAgICAgICRlbGVtZW50Lm9uKCdtb3VzZWRvd24nLCBzdG9wRHJhZyk7XG4gICAgICAkZWxlbWVudC5vbignbW91c2V1cCcsIGFsbG93RHJhZyk7XG5cbiAgICB9XVxuICB9O1xufV0pXG4iXX0=
