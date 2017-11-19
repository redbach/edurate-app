var express = require("express");
var router = express.Router({mergeParams: true});
var Provider = require("../models/provider");
var Review = require("../models/review");
var middleware = require("../middleware");

// REVIEWS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find provider by id
    
    Provider.findById(req.params.id, function(err, provider){
        if(err){
            console.log(err);
        } else {
             res.render("reviews/new", {provider: provider});
        }
    });
});

// REVIEWS CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup provider using ID
   Provider.findById(req.params.id, function(err, providerPH){
       if(err){
         console.log(err);
      res.redirect("/providers");
       } else {
         // create new review 
         Review.create(req.body.review, function(err, review){
            if(err){
               req.flash("error", "Something went worng!");
               console.log(err);
            } else {
                // connect/associate new review to the provider
                // add username and ID to review
                review.author.id = req.user._id;
                review.author.username = req.user.username;
                // save review
                review.save();
                providerPH.reviews.push(review);
                providerPH.save();
                // console.log(review);
                req.flash("success", "Review  added.");
                // redirect to provider SHOW page
                res.redirect("/providers/" + providerPH._id);
            }
         });
       }
   });
});

// REVIEW EDIT ROUTE
router.get("/:review_id/edit", middleware.checkReviewOwnership, function(req, res){
    Review.findById(req.params.review_id, function(err, foundReviewPH){
        if(err){
            res.redirect("back");
        } else {
            res.render("reviews/edit", {provider_id: req.params.id, review: foundReviewPH});
        }
    });
});

// REVIEW UPDATE ROUTE
router.put("/:review_id", middleware.checkReviewOwnership, function(req, res){
      Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReviewPH){
            if(err){
               res.redirect("back");
            } else {
               res.redirect("/providers/" + req.params.id);
            }
      });
});

// REVIEW DESTROY ROUTE
router.delete("/:review_id", middleware.checkReviewOwnership, function(req, res){
   // findByIdAndRemove
   Review.findByIdAndRemove(req.params.review_id, function(err){
      if(err){
         res.redirect("back");
      } else {
         req.flash("success", "Review deleted.");
         res.redirect("/providers/" + req.params.id);
      }
   });
});

module.exports = router;