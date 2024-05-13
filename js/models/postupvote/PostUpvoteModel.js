define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var PostUpvoteModel = Backbone.Model.extend({

  	defaults : {
  		post_id : '',
  		user_handle : ''
  	},
  });

  return PostUpvoteModel;
});
