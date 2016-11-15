angular.module('app.directives', [])

.directive('notePresenter', [function(){
  return {
    scope: true,
    controller: [
      '$scope',
      '$element',
      '$attrs',
      '$parse',
      '$compile',
      '$state',
      '$firebaseArray',
      'HashtagService',
      function(
        $scope,
        $element,
        $attrs,
        $parse,
        $compile,
        $state,
        $firebaseArray,
        HashtagService
      ){

      var data = $parse($attrs.notePresenter)($scope);

      var ref = firebase.database().ref();
      var tags = ref.child('tags')
      var list = $firebaseArray(tags);

      $scope.$watch('data.note', function (newVal, oldVal) {
        if (newVal && !oldVal || newVal == oldVal){
          parseTags();
        }
      })

      $scope.goToHashtag = function(){
        console.log('goToHashtag');
      }

      function parseTags(){
        if (data.note){
          var taggedText = HashtagService.parse(data.note);
          var template = angular.element('<span>' + taggedText + '</span>');
          var element = $compile(template)($scope);
          $element.append(element[0]);
        }
      }
    }]
  }
}]);
