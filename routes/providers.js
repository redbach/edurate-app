var express = require("express");
var router = express.Router();
var Provider = require("../models/provider");
var middleware = require("../middleware");

//INDEX - show all providers
router.get("/", function(req, res){
   // Get all providers from DB.
   Provider.find({}, function(err, allProviders){
		if(err){
			console.log(err);
		} else {
		   res.render("providers/index", {providers:allProviders});
		}
	});
});

// CREATE - add new provider to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and add it to providers array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var descriptor = req.body.descriptor;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newProvider = {name: name, price: price, image: image, description: desc, descriptor: descriptor, author: author};
    // Create a new provider and save it to the DB
    Provider.create(newProvider, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        // redirect back to the providers page
            console.log(newlyCreated);
            res.redirect("/providers");
        }
    });
});

//NEW - show form to create new provider
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("providers/new");
});

//SHOW - displays more info about the selected provider
router.get("/:id", function(req, res){
    // find the provider with specified ID
    Provider.findById(req.params.id).populate("reviews").exec(function(err, foundProviderPH){
        if(err){
			console.log(err);
		} else {
			// console.log(foundProviderPH); 
			// render show template with that provider
			res.render("providers/show", {provider: foundProviderPH});
		}
	});
});
  
// EDIT PROVIDER ROUTE
router.get("/:id/edit", middleware.checkProviderOwnership, function(req, res){
    Provider.findById(req.params.id, function(err, foundProviderPH){
        res.render("providers/edit", {provider: foundProviderPH});
    });
});

// UPDATE PROVIDER ROUTE
router.put("/:id", middleware.checkProviderOwnership, function(req, res){
    //find and update the correct provider
    Provider.findByIdAndUpdate(req.params.id, req.body.provider, function(err, updatedProviderPH){
        if(err){
            res.redirect("/providers");  //lazy option for now
        } else {
            //redirect to the SHOW page
            res.redirect("/providers/" + req.params.id);
        }
    });
});

// DESTROY PROVIDER ROUTE
router.delete("/:id", middleware.checkProviderOwnership, function(req, res){
    Provider.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/providers");
        } else {
          res.redirect("/providers");
        }
    });
});

module.exports = router;