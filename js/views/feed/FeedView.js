define([
  'jquery',
  'underscore',
  'backbone',
  'collections/feedposts/FeedPostsCollection',
  'collections/postupvotes/PostUpvotesCollection',
  'collections/comments/CommentsCollection',
  'text!templates/feed/feedTemplate.html',
  'services/auth/AuthService'
], function($, _, Backbone, FeedPostsCollection, PostUpvotesCollection, CommentsCollection, feedTemplate, AuthService){

  var FeedView = Backbone.View.extend({
    el: $("#container"),

    initialize : function() {
      var that = this;
      that.feedPosts = new FeedPostsCollection();
      that.postUpvotes = new PostUpvotesCollection();
      that.comments = new CommentsCollection();
      that.bind("reset", that.clearView);
    },

    render: function(){
      var that = this;
      let userData = AuthService.getUser();

      // window.location.href = "/#/login";
      // location.reload();
      that.feedPosts.fetch({
        headers: {
          "Authorization": `Bearer ${userData.auth_token}`
        },
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
          headers: {
            "Authorization": `Bearer ${userData.auth_token}`
          },
          success: function(upvotes, response) {
            that.postUpvotes = upvotes.toJSON();
            return that.postUpvotes;
          },
          error: function(upvotes, error) {
            console.error("Error fetching data:", error);
          }
        })
        .then((postUpvotesData) => {
          that.comments.fetch({
            headers: {
              "Authorization": `Bearer ${userData.auth_token}`
            },
            success: function(comments, response) {
              that.comments = comments.toJSON();
              return that.comments;
            },
            error: function(comments, error) {
              console.error("Error fetching data:", error);
            }
          })
          .then((commentsData) => {
            combinedData = this.combineCollections(feedPostsData, postUpvotesData, commentsData);

            console.log(combinedData);
  
            var templateData = {
              posts: combinedData
            }
            var feedCompiledTemplate = _.template( feedTemplate, templateData);
            this.$el.html(feedCompiledTemplate);

            return combinedData;
          })
          .then((combinedData) => {
            combinedData.forEach(post => {
              this.addEventListenerToPost(post);
              this.addEventListenerToCloseButton(post);
            });
          });
        });
      });
    },

    addEventListenerToPost: function(post) {
      return new Promise((resolve) => {
        $(`#feed-post-${post.post_id}`).one('click', function(event) {
          document.getElementById(`enlarged-post-section-${post.post_id}`).style.visibility = 'visible';
          document.getElementById(`enlarged-post-section-${post.post_id}`).style.height = 'auto';
        });
        resolve();
      });
    },

    addEventListenerToCloseButton : function(post) {
      return new Promise((resolve) => {
        $(`#enlarged-post-${post.post_id}-close-button`).on('click', function(event) {
          document.getElementById(`enlarged-post-section-${post.post_id}`).style.visibility = 'hidden';
          document.getElementById(`enlarged-post-section-${post.post_id}`).style.height = 0;

          setTimeout(() => {
            $(`#feed-post-${post.post_id}`).on('click', function(event) {
              document.getElementById(`enlarged-post-section-${post.post_id}`).style.visibility = 'visible';
              document.getElementById(`enlarged-post-section-${post.post_id}`).style.height = 'auto';
              $(`#feed-post-${post.post_id}`).off('click');
            });
          }, 300);
        });
        resolve();
      });
    },

    combineCollections: function(feedPosts, postUpvotes, comments) {
      let formattedFeedPosts = [];

      for (let feedPost of feedPosts) {
        let selectedPostUpvotes = [];
        let selectedComments = [];
        for (let postUpvote of postUpvotes) {
          if (postUpvote.post_id === feedPost.post_id) {
            selectedPostUpvotes.push(postUpvote);
          }
        }
        for (let comment of comments) {
          if (comment.post_id === feedPost.post_id) {
            selectedComments.push(comment);
          }
        }
        feedPost.post_upvotes = selectedPostUpvotes;
        feedPost.comments = selectedComments;
        formattedFeedPosts.push(feedPost);
      }

      return formattedFeedPosts;
    }
  });

  return FeedView;
  
});
