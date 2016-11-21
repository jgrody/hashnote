angular.module('app.directives', [])

.directive('notePresenter', [function(){
  return {
    scope: true,
    controller: function(
      $scope,
      $element,
      $attrs,
      $parse,
      $compile,
      $state,
      $firebaseArray,
      HashtagService
    ){
      "ngInject";

      var data = $parse($attrs.notePresenter)($scope);

      var ref = firebase.database().ref();
      var tags = ref.child('tags')
      var list = $firebaseArray(tags);

      $scope.$watch('data.note', function (newVal, oldVal) {
        if (newVal && !oldVal || newVal == oldVal){
          parseTags();
        }
      })

      $scope.goToHashtag = function($event){
        var tag = $event.currentTarget.text;
        tag = tag.replace("#", '');
        $state.go('tabsController.notes', {tag: tag})
      }

      function parseTags(){
        if (data.note){
          var taggedText = HashtagService.parse(data.note);
          var template = angular.element('<span>' + taggedText + '</span>');
          var element = $compile(template)($scope);
          $element.append(element[0]);
        }
      }
    }
  }
}]);
