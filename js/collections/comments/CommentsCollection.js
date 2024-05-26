define([
  'underscore',
  'backbone',
  'models/comment/CommentModel'
], function(_, Backbone, CommentModel){

  var Comments = Backbone.Collection.extend({

    model: CommentModel,
    
    initialize : function(models, options) {},
    
    url : function() {
      return 'http://localhost/storysphere-server/Comments/All';
    },
    
    parse : function(data) {
      var uniqueArray = data;
      return uniqueArray;
    }
  });

  return Comments;
});
