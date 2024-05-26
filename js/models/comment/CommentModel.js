define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var CommentModel = Backbone.Model.extend({

  	defaults : {
      comment_id: "",
      post_id: "",
      comment_body: "",
      user_handle: "",
      time_stamp: ""
  	},
  });

  return CommentModel;
});
