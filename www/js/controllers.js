angular.module('app.controllers', [])

.controller('notesCtrl', [
  '$scope',
  '$stateParams',
  '$firebaseArray',
  '$filter',
function (
  $scope,
  $stateParams,
  $firebaseArray,
  $filter
) {

  $scope.user = firebase.auth().currentUser;

  $scope.$watch('user.uid', function(newVal){
    if (!newVal) return;
    var ref = firebase.database().ref();
    var notes = ref.child($scope.user.uid).child('notes')
    var list = $firebaseArray(notes);

    $scope.list = list;

    // Delete empty notes
    $scope.list.$loaded(function (notesArray) {
      notesArray.each(function (n, index) {
        if (n.note == "") $scope.list.$remove(index);
      })
    })

    console.log('before remove');
  })


  $scope.goTo = function(item){
    console.log('item', item)
  }

}])

.controller('settingsCtrl', [
  '$scope',
  '$state',
  function (
    $scope,
    $state
  ) {

  $scope.user = firebase.auth().currentUser;

  $scope.logout = function(){
    firebase.auth().signOut().then(function() {
      $state.go('tabsController.login')
    }, function(error) {
      console.log('error', error)
    });
  }
}])

.controller('newPaddCtrl', [
  '$scope',
  '$state',
  '$firebaseArray',
  '$firebaseObject',
  'NoteService',
function (
  $scope,
  $state,
  $firebaseArray,
  $firebaseObject,
  NoteService
) {

  var ref, notes, list, tagsRef, tags, newNoteObject;

  $scope.user = firebase.auth().currentUser;
  $scope.data = {};

  $scope.$watch('user.uid', function(newVal){
    if (!newVal) return;
    ref = firebase.database().ref();
    notes = ref.child($scope.user.uid).child('notes')
    list = $firebaseArray(notes);

    list.$add({note: ""}).then(function (a) {
      var pathArray = a.path.o.join('/')
      $scope.data = $firebaseObject(ref.child(pathArray))
    })

    tagsRef = ref.child('tags');
    tags = $firebaseArray(tagsRef);
  })

  $scope.update = function(){
    NoteService.update($scope.data)
      .then(function() {
        $state.go('tabsController.notes')
      })
  }
}])

.controller('editCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$firebaseObject',
  'NoteService',
function (
  $scope,
  $state,
  $stateParams,
  $firebaseObject,
  NoteService
) {

  $scope.user = firebase.auth().currentUser;
  $scope.data = {};
  $scope.options = {
    editing: false,
    actionText: 'Edit'
  }

  $scope.$watch('user.uid', function(newVal, oldVal){
    if (!newVal) return;
    var ref = firebase.database().ref();
    var note = ref
    .child($scope.user.uid)
    .child('notes')
    .child($stateParams.id)

    $scope.data = $firebaseObject(note)
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
}])

.controller('signupCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  function (
    $scope,
    $stateParams,
    $state
  ) {

    $scope.data = {
      'name': '',
      'email': '',
      'password': ''
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

}])

.controller('loginCtrl', [
  '$scope',
  '$state',
  function(
    $scope,
    $state
  ) {

    $scope.data = {
      'email': '',
      'password': ''
    }

    $scope.error = '';

    $scope.login = function(){
      $scope.error = '';
      firebase.auth().signInWithEmailAndPassword(
        $scope.data.email,
        $scope.data.password
      ).then(function(data){
        $state.go('tabsController.notes')
      })
      .catch(function(error) {
        console.log('error', error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $scope.error = errorMessage;
        $scope.$apply()
      })
    }
}])
