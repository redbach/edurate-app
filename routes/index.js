var express = require("express");
var router = express.Router();
var passport = require("passport");
var Provider = require("../models/provider");
var User = require("../models/user");


// Root route
router.get("/", function(req, res){
   res.render("landing");
});
 
// show register form
router.get("/register", function(req, res){
   res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
     if(err){
        req.flash("error", err.message);  //message done for us
        return res.redirect("register");
     } 
     passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to the site, " + user.username + ".");
        res.redirect("/providers");
     });
   });
});

// show login form
router.get("/login", function(req, res){
   res.render("login");
});

// handling login logic with middleware
router.post("/login", passport.authenticate("local", 
   {
      successRedirect: "/providers",
      failureRedirect: "/loginFailure"
   }), function(req, res) {
}); 

// login error
router.get('/loginFailure', function(req, res) {
    req.flash("error", "Incorrect username and/or password entered. Please try again.");
    res.redirect("/login");
});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You have been logged out.");  
	res.redirect("/providers");
});

module.exports = router;