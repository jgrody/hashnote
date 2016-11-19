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

.config(function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
})

.run(function($ionicPlatform, $state) {
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
})

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
