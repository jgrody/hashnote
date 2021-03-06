angular.module('app.controllers', [])
.controller('notesCtrl', function(
  $scope,
  user,
  list,
  $state,
  $stateParams
) {

  "ngInject";

  $scope.options = {};
  $scope.options.showDelete = false;
  $scope.options.showSearch = false;
  $scope.options.search = $stateParams.tag;

  list.$loaded(function () {
    $scope.list = list;

    // Delete empty notes
    $scope.list.$loaded(function (notesArray) {
      notesArray.each(function (n, index) {
        if (!n.note) $scope.list.$remove(index);
      })
    })
  })

  $scope.toggleDelete = function(){
    $scope.options.showDelete = !$scope.options.showDelete;
  }

  $scope.toggleSearch = function(){
    $scope.options.showSearch = !$scope.options.showSearch;
  }

  $scope.remove = function(item){
    list.$remove(item)
  }
})

.controller('settingsCtrl', function($scope, $state, user) {
  "ngInject";

  $scope.user = user;

  $scope.logout = function(){
    firebase.auth().signOut().then(function() {
      $state.go('tabsController.login')
    }, function(error) {
      console.log('error', error)
    });
  }
})

.controller('newPaddCtrl', function(
  $scope,
  user,
  notes,
  tags,
  $state,
  $firebaseObject,
  NoteService
) {
  "ngInject";

  $scope.user = user;

  var ref = firebase.database().ref();

  $scope.data = {};

  notes.$loaded(function() {
    notes.$add({note: ""}).then(function (a) {
      var pathArray = a.path.o.join('/')
      $scope.data = $firebaseObject(ref.child(pathArray))
    })
  })

  $scope.update = function(){
    NoteService.update($scope.data)
      .then(function() {
        $state.go('tabsController.notes')
      })
  }
})

.controller('editCtrl', function(
  $scope,
  user,
  note,
  $state,
  NoteService
) {
  "ngInject";

  $scope.user = user;

  $scope.data = {};
  $scope.options = {
    editing: false,
    actionText: 'Edit'
  }

  note.$loaded(function() {
    $scope.data = note;
  })

  $scope.performAction = function(){
    if ($scope.options.editing){
      NoteService.update($scope.data, $scope.data)
      .then($scope.toggleEdit)
    } else {
      var el = document.getElementsByClassName('note-form');
      $scope.data.note = el[0].innerText;

      $scope.toggleEdit();
    }
  }

  $scope.toggleEdit = function(){
    $scope.options.actionText = $scope.options.actionText == 'Save' ? 'Edit' : 'Save';
    $scope.options.editing = !$scope.options.editing;
  }

  $scope.goBack = function(){
    // $state.go('page1/tab1/page2');
    $state.go('tabsController.notes')
  }
})

.controller('signupCtrl', function($scope, $state) {
  "ngInject";

  $scope.data = {
    name: '',
    email: '',
    password: ''
  }

  $scope.error='';

  $scope.signup = function(){
    $scope.error = '';
    firebase.auth().createUserWithEmailAndPassword(
      $scope.data.email,
      $scope.data.password
    ).then(function(data){
      firebase.auth().signInWithEmailAndPassword(
        $scope.data.email,
        $scope.data.password
      )
      .then(function(data){
        var current = firebase.auth().currentUser;
        current.updateProfile({
          displayName: $scope.data.name
        }).then(function(){
          $state.go('tabsController.notes')
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $scope.error = errorMessage;
        $scope.$apply()
      });
    })
    .catch(function(error) {
      console.log('error', error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $scope.error = error.message;
      $scope.$apply()
    });
  }

})

.controller('loginCtrl', function($scope, $state) {
  "ngInject";

  $scope.data = {
    email: '',
    password: ''
  }

  $scope.error = '';

  $scope.login = function(){
    $scope.error = '';
    firebase.auth().signInWithEmailAndPassword(
      $scope.data.email,
      $scope.data.password
    ).catch(function(error) {
      console.log('error', error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $scope.error = errorMessage;
      $scope.$apply()
    })
  }
})
