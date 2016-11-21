angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('tabsController.notes', {
    url: '/page2',
    resolve: {
      user: [function(){
        return firebase.auth().currentUser;
      }],
      list: function(user, $firebaseArray, $stateParams){
        "ngInject";

        var ref = firebase.database().ref();
        var notesRef = ref.child(user.uid).child('notes');
        return $firebaseArray(notesRef);
      }
    },
    params: {
      tag: ""
    },
    views: {
      'tab1': {
        templateUrl: 'templates/notes.html',
        controller: 'notesCtrl',
      },
      'tab2': {
        templateUrl: 'templates/notes.html',
        controller: 'notesCtrl',
      },
      'tab3': {
        templateUrl: 'templates/notes.html',
        controller: 'notesCtrl',
      }
    }
  })

  .state('tabsController.settings', {
    url: '/page4',
    resolve: {
      user: function(){
        return firebase.auth().currentUser;
      }
    },
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController.newPadd', {
    url: '/page8',
    resolve: {
      user: [function(){
        return firebase.auth().currentUser;
      }],
      notes: function(user, $firebaseArray){
        "ngInject";

        var ref = firebase.database().ref();
        var notesRef = ref.child(user.uid).child('notes');
        return $firebaseArray(notesRef);
      },
      tags: function($firebaseArray){
        "ngInject";

        var ref = firebase.database().ref();
        var tagsRef = ref.child('tags');
        return $firebaseArray(tagsRef);
      }
    },
    views: {
      'tab2': {
        templateUrl: 'templates/newPadd.html',
        controller: 'newPaddCtrl'
      }
    }
  })
  .state('tabsController.edit', {
    url: '/page11',
    resolve: {
      user: [function(){
        return firebase.auth().currentUser;
      }],
      note: function(user, $firebaseObject, $stateParams){
        "ngInject";

        var ref = firebase.database().ref();

        var noteRef = ref
          .child(user.uid)
          .child('notes')
          .child($stateParams.id)

        return $firebaseObject(noteRef);
      }
    },
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

  // $urlRouterProvider.otherwise('/page1/tab1/page2')

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get('$state');

    $state.go('tabsController.settings');
  });

});
