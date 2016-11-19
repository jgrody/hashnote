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

.run(["$ionicPlatform", function($ionicPlatform) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICdpb25pYycsXG4gICdhcHAuY29udHJvbGxlcnMnLFxuICAnYXBwLnJvdXRlcycsXG4gICdhcHAuZGlyZWN0aXZlcycsXG4gICdhcHAuc2VydmljZXMnLFxuICAnZmlyZWJhc2UnLFxuICAnZmlyZWJhc2VDb25maWcnLFxuICAnYXBwLmZpbHRlcnMnLFxuICAnbmdTYW5pdGl6ZScsXG5dKVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRpb25pY0NvbmZpZ1Byb3ZpZGVyLCAkc2NlRGVsZWdhdGVQcm92aWRlcil7XG4gICRzY2VEZWxlZ2F0ZVByb3ZpZGVyLnJlc291cmNlVXJsV2hpdGVsaXN0KFsgJ3NlbGYnLCcqOi8vd3d3LnlvdXR1YmUuY29tLyoqJywgJyo6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyoqJ10pO1xufSlcblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcblxuLmRpcmVjdGl2ZSgnZGlzYWJsZVNpZGVNZW51RHJhZycsIFsnJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZScsICckcm9vdFNjb3BlJywgZnVuY3Rpb24oJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSwgJHJvb3RTY29wZSkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiBcIkFcIixcbiAgICBjb250cm9sbGVyOiBbJyRzY29wZScsICckZWxlbWVudCcsICckYXR0cnMnLCBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cbiAgICAgIGZ1bmN0aW9uIHN0b3BEcmFnKCl7XG4gICAgICAgICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhbGxvd0RyYWcoKXtcbiAgICAgICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgJHJvb3RTY29wZS4kb24oJyRpb25pY1NsaWRlcy5zbGlkZUNoYW5nZUVuZCcsIGFsbG93RHJhZyk7XG4gICAgICAkZWxlbWVudC5vbigndG91Y2hzdGFydCcsIHN0b3BEcmFnKTtcbiAgICAgICRlbGVtZW50Lm9uKCd0b3VjaGVuZCcsIGFsbG93RHJhZyk7XG4gICAgICAkZWxlbWVudC5vbignbW91c2Vkb3duJywgc3RvcERyYWcpO1xuICAgICAgJGVsZW1lbnQub24oJ21vdXNldXAnLCBhbGxvd0RyYWcpO1xuXG4gICAgfV1cbiAgfTtcbn1dKVxuIl19
