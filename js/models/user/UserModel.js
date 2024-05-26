define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var UserModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.custom_options = options;
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

			if(that.custom_options.authenticate) {
				return `http://localhost/storysphere-server/Auth/authenticate?user_handle=${that.custom_options.user_handle}&password=${that.custom_options.password}`;
			}
			else if(that.custom_options.get_user) {
				return 'http://localhost/storysphere-server/Users?user_handle=' + that.user_handle;
			}
			return 'http://localhost/storysphere-server/Users';
		},
  });

  return UserModel;
});
