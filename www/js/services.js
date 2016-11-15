angular.module('app.services', [])

.service('NoteService', [function(){
  var db = firebase.database().ref();
  var hashtagRegex = /[#]+[A-Za-z0-9-_]+/g;

  return {
    update: function(noteObj){
      var tagsRef = db.child('tags');
      var hashes = [];

      noteObj.createdAt = firebase.database.ServerValue.TIMESTAMP;

      noteObj.note.replace(hashtagRegex, function(tag) {
        hashes.push(tag);
      })

      noteObj.tags = hashes;

      return noteObj.$save();
    }
  }
}])

.service('HashtagService', [function(){
  var hashtagRegex = /[#]+[A-Za-z0-9-_]+/g;

  return {
    parse: function(note){
      return note.replace(hashtagRegex, function(tag) {
        return tag.replace(
          tag,
          '<a class="hashtag" href="javascript:void(0)" ng-click="goToHashtag()">'+tag+'</a>'
        );
      })
    }
  }
}]);
