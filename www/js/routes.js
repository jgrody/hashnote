angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.notes'
      2) Using $state.go programatically:
        $state.go('tabsController.notes');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page2
      /page1/tab2/page2
      /page1/tab3/page2
  */
  .state('tabsController.notes', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/notes.html',
        controller: 'notesCtrl'
      },
      'tab2': {
        templateUrl: 'templates/notes.html',
        controller: 'notesCtrl'
      },
      'tab3': {
        templateUrl: 'templates/notes.html',
        controller: 'notesCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController.newPadd', {
    url: '/page8',
    views: {
      'tab2': {
        templateUrl: 'templates/newPadd.html',
        controller: 'newPaddCtrl'
      }
    }
  })
  .state('tabsController.edit', {
    url: '/page11',
    params: {
      id: ""
    },
    views: {
      'tab1': {
        templateUrl: 'templates/edit.html',
        controller: 'editCtrl'
      },
      'tab2': {
        templateUrl: 'templates/edit.html',
        controller: 'editCtrl'
      },
      'tab3': {
        templateUrl: 'templates/edit.html',
        controller: 'editCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })
  .state('tabsController.signup', {
    url: '/page5',
    views: {
      'tab2': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      },
      'tab3': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })
  .state('tabsController.login', {
    url: '/page6',
    views: {
      'tab2': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      },
      'tab3': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/page1/tab1/page2')

});
