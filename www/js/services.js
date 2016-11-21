angular.module('app.services', [])

.service('NoteService', function(){
  "ngInject";

  var db = firebase.database().ref();
  var hashtagRegex = /[#]+[A-Za-z0-9-_]+/g;

  return {
    update: function(noteObj){
      var user = firebase.auth().currentUser;
      var tagsRef = db.child('tags');
      var originalTags = noteObj.tags || [];
      var newTags = [];
      console.log('note', noteObj);

      noteObj.createdAt = firebase.database.ServerValue.TIMESTAMP;

      noteObj.note.replace(hashtagRegex, function(tag) {
        var stripped = tag.replace("#", '');
        newTags.push(stripped);
      })

      noteObj.tags = newTags;

      originalTags.each(function(tag) {
        tagsRef.child(tag).child(noteObj.$id).set(null)
        // tagsRef.child(tag).child(user.uid).set(null)
      })

      newTags.each(function (tag) {
        tagsRef.child(tag).child(noteObj.$id).set(true)
        // tagsRef.child(tag).child(user.uid).set(true)
      })

      return noteObj.$save();
    }
  }
})

.service('HashtagService', function($sce){
  "ngInject";

  var hashtagRegex = /[#]+[A-Za-z0-9-_]+/g;

  return {
    parse: function(note){
      note = note.replace(hashtagRegex, function(tag) {
        return tag.replace(
          tag,
          '<a class="hashtag" href="javascript:void(0)" ng-click="goToHashtag($event)">'+tag+'</a>'
        );
      })

      return $sce.trustAsHtml(note)
    }
  }
});
