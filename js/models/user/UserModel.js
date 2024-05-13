define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var UserModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.user_handle = options.user_handle; 
		},

  	defaults : {
  		user_handle : '',
  		first_name : '',
  		middle_name : '',
  		last_name : '',
  		email : ''
  	},
		
		urlRoot: function() {
			that = this;
			return 'http://localhost/storysphere-server/Users?user_handle=' + that.user_handle;
		},
  });

  return UserModel;
});
