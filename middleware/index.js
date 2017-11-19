var Provider = require("../models/provider");
var Review = require("../models/review");
// var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkProviderOwnership = function(req, res, next){
   // is user logged in?
   if(req.isAuthenticated()){
      Provider.findById(req.params.id, function(err, foundProvider){
         if(err){
             req.flash("error", "Provider not found."); 
             res.redirect("back");
         } else {
             // did the user add the provider?
             if(foundProvider.author.id.equals(req.user._id)){
                 next();
             } else {
                 req.flash("error", "You don't have permission to do that."); 
                 res.redirect("back");
             }
         }
     });
    } else {
      req.flash("error", "You need to be logged in to do that."); 
      res.redirect("back"); 
   }
};

middlewareObj.checkReviewOwnership = function(req, res, next){
    // is user logged in?
   if(req.isAuthenticated()){
      Review.findById(req.params.review_id, function(err, foundReview){
         if(err){
             res.redirect("back");
         } else {
             // did the user add the review?
             if(foundReview.author.id.equals(req.user._id)){
                 next();
             } else {
                 req.flash("error", "You don't have permission to do that.");                
                 res.redirect("back");
             }
         }
     });
   } else {
      req.flash("error", "You need to be logged in to do that.");
      res.redirect("back"); 
   }
};

// middlewareObj.checkCommentOwnership = function(req, res, next){
//     // is user logged in?
//    if(req.isAuthenticated()){
//       Comment.findById(req.params.comment_id, function(err, foundComment){
//          if(err){
//              res.redirect("back");
//          } else {
//              //did the user add the comment?
//              if(foundComment.author.id.equals(req.user._id)){
//                  next();
//              } else {
//                  req.flash("error", "You don't have permission to do that.");                
//                  res.redirect("back");
//              }
//          }
//      });
//    } else {
//       req.flash("error", "You need to be logged in to do that.");
//       res.redirect("back"); 
//    }
// };

middlewareObj.isLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   req.flash("error", "You need to be logged in to do that.");
   res.redirect("/login");
};

module.exports = middlewareObj;