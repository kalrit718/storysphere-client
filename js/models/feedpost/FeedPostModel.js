define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var FeedPostModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.user_handle = options.user_handle; 
		},

  	defaults : {
  		user_handle : '',
  		content : '',
  		image_url : '',
  		timestamp : ''
  	},
  });

  return FeedPostModel;
});
