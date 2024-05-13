define([
  'underscore',
  'backbone',
  'models/postupvote/PostUpvoteModel'
], function(_, Backbone, PostUpvoteModel){

  var PostUpvotes = Backbone.Collection.extend({

    model: PostUpvoteModel,
    
    initialize : function(models, options) {},
    
    url : function() {
      return 'http://localhost/storysphere-server/Posts/AllUpvotes';
    },
    
    parse : function(data) {
      var uniqueArray = data;
      return uniqueArray;
    }
  });

  return PostUpvotes;
});