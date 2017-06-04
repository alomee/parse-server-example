Parse.Cloud.define("sendMessagePush", function(request, response) {
  var params = request.params;
  var recipientIds = params.recipientIds
  var data = params.data
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios');
platform.
  pushQuery.containedIn('ownerId', recipientIds);
recipients.
  Parse.Push.send({
    where: pushQuery,
    data: data
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});
  response.success('success');
});
//Only target users on the iOS
//Only send the message to the
// Set our Installation query
Parse.Cloud.define("flagUser", function(request, response) {
  var params = request.params;
request.
  var displayedUserId = params.displayedUserId;
profile view.
  //Get the displayed user object.
  var user = Parse.Object.extend("_User");
  var query = new Parse.Query(user);
  query.equalTo("objectId", displayedUserId);
  query.find().then(function(results) {
    if (results[0])
    {
      var displayedUser = results[0];
      var flagCount = displayedUser.get("flagCount");
displayed user.
      var newFlagCount = flagCount + 1;
      displayedUser.set("flagCount", newFlagCount);
displayed user.
      //Save the displayed user to the backend.
      displayedUser.save(null, {useMasterKey:true});
    }
  }, function(error) {
    response.error("User could not be flagged.");
});
  response.success('success');
});
//Grab the parameters from the
//Get the displayed user id from the
    //Get the flag count from the
    //Add one to the flag count.
    //Set the new flag count to the
Parse.Cloud.define("removeCurrentUserFromLockedRelation", function(request, response) {
  var params = request.params;
  var currentUserId = params.currentUserId;
  var displayedUserId = params.displayedUserId;
var User = Parse.Object.extend('_User');
       var currentUser = new User({ objectId:currentUserId});
       var displayedUser = new User({objectId:displayedUserId});
       var relation = displayedUser.relation("friendsRelation");
       relation.remove(currentUser);
       Parse.Cloud.useMasterKey();
       displayedUser.save().then(function(user) {
           response.success('success');
         }, function(error) {
           response.error("Error: " + error);
        });
       response.success('success');
     });
