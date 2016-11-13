angular.module('app.controllers', [])

.controller('notesCtrl', ['$scope', '$stateParams', '$firebaseArray', '$filter', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $filter) {
    $scope.user = firebase.auth().currentUser;

    $scope.$watch('user.uid', function(newVal){
        if (!newVal) return;
        var ref = firebase.database().ref();
        var notes = ref.child($scope.user.uid).child('notes')
        var list = $firebaseArray(notes);
        $scope.list = list;
    })

    $scope.goTo = function(item){
        console.log('item', item)
    }

}])

.controller('settingsCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state) {

    console.log('user', firebase.auth().currentUser)
    $scope.user = firebase.auth().currentUser;

    $scope.logout = function(){
        firebase.auth().signOut().then(function() {
          $state.go('tabsController.login')
        }, function(error) {
          console.log('error', error)
        });
    }
}])

.controller('newPaddCtrl', ['$scope', '$state', '$firebaseArray', '$filter', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $firebaseArray, $filter) {
    var ref, notes, list;

    $scope.user = firebase.auth().currentUser;
    $scope.data = {};

    $scope.$watch('user.uid', function(newVal){
        console.log(newVal)
        if (!newVal) return;
        ref = firebase.database().ref();
        notes = ref.child($scope.user.uid).child('notes')
        list = $firebaseArray(notes);
    })

    $scope.logout = function(){
        firebase.auth().signOut().then(function() {
          $state.go('tabsController.login')
        }, function(error) {
          console.log('error', error)
        });
    }

    $scope.add = function(){
        $scope.data.createdAt = firebase.database.ServerValue.TIMESTAMP;
        $scope.displayDate = $filter('date')($scope.data.createdAt, "MMM d, yyyy 'at' h:mm a");

        list.$add($scope.data).then(function(){
            $state.go('tabsController.notes')
        })
    }
}])

.controller('editCtrl', ['$scope', '$state', '$stateParams', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $firebaseObject) {

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
        $scope.data.$save()
          .then($scope.parseTags)
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

.controller('signupCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

    console.log('auth', firebase.auth())

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

.controller('loginCtrl', ['$scope', '$state', function ($scope, $state) {

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
