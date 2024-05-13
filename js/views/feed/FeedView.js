define([
  'jquery',
  'underscore',
  'backbone',
  'collections/feedposts/FeedPostsCollection',
  'collections/postupvotes/PostUpvotesCollection',
  'text!templates/feed/feedTemplate.html'
], function($, _, Backbone, FeedPostsCollection, PostUpvotesCollection, feedTemplate){

  var FeedView = Backbone.View.extend({
    el: $("#container"),

    initialize : function() {
      var that = this;
      that.feedPosts = new FeedPostsCollection();
      that.postUpvotes = new PostUpvotesCollection();
      that.bind("reset", that.clearView);
    },

    render: function(){
      var that = this;

      that.feedPosts.fetch({
        success: function(posts, response) {
          that.feedPosts = posts.toJSON();
          return that.feedPosts;
        },
        error: function(posts, error) {
          console.error("Error fetching data:", error);
        }
      })
      .then((feedPostsData) => {
        that.postUpvotes.fetch({
          success: function(upvotes, response) {
            that.postUpvotes = upvotes.toJSON();
            return that.postUpvotes;
          },
          error: function(user, error) {
            console.error("Error fetching data:", error);
          }
        })
        .then((postUpvotesData) => {
          postUpvotesData = postUpvotesData;
          combinedData = this.combineCollections(feedPostsData, postUpvotesData);

          var templateData = {
            posts: combinedData
          }
          var feedCompiledTemplate = _.template( feedTemplate, templateData);
          this.$el.html(feedCompiledTemplate);
        });  
      })
    },

    combineCollections: function(feedPosts, postUpvotes) {
      let formattedFeedPosts = [];

      for (let feedPost of feedPosts) {
        let selectedPostUpvotes = [];
        for (let postUpvote of postUpvotes) {
          if (postUpvote.post_id === feedPost.post_id) {
            selectedPostUpvotes.push(postUpvote);
          }
        }
        feedPost.postUpvotes = selectedPostUpvotes;
        formattedFeedPosts.push(feedPost);
      }

      return formattedFeedPosts;
    }
  });

  return FeedView;
  
});
