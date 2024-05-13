define([
  'underscore',
  'backbone',
  'models/feedpost/FeedPostModel'
], function(_, Backbone, FeedPostModel){

  var FeedPosts = Backbone.Collection.extend({

    model: FeedPostModel,
    
    initialize : function(models, options) {},
    
    url : function() {
      return 'http://localhost/storysphere-server/Posts/All';
    },
    
    parse : function(data) {
      var uniqueArray = data;
      return uniqueArray;
    }
  });

  return FeedPosts;
});