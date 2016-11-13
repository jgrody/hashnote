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
      function(
        $scope,
        $element,
        $attrs,
        $parse,
        $compile,
        $state
      ){

      var data = $parse($attrs.notePresenter)($scope);

      $scope.$watch('data.note', function (newVal, oldVal) {
        if (
          newVal && !oldVal ||
          newVal == oldVal
        ){
          parseTags();
        }
      })

      $scope.goToHashtag = function(){
        console.log('goToHashtag');
      }

      function parseTags(){
        if (data.note){
          var taggedText = data.note.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
            return t.replace(
              t,
              '<a class="hashtag" href="javascript:void(0)" ng-click="goToHashtag()">'+t+'</a>'
            );
          })

          var template = angular.element('<span>' + taggedText + '</span>');
          var element = $compile(template)($scope);
          $element.append(element[0]);
        }
      }
    }]
  }
}]);
