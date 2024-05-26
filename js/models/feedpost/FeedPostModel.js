define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var FeedPostModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.user_handle = options.user_handle; 
		},

  	defaults : {
			post_id : '',
  		user_handle : '',
  		title : '',
  		content : '',
  		image_url : '',
  		time_stamp : ''
  	},
  });

  return FeedPostModel;
});
