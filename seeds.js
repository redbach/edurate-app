var mongoose	= require("mongoose");
var Provider	= require("./models/provider");
var Review 		= require("./models/review");

var data = [
	{
		name: "Provider Name",
		image: "http://localhost:3000/images/PP1-640x128.jpg",
		descriptor: "Private Education Review Site",
		description: "Description of provider's product/service. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
	},
	{
		name: "Provider Name",
		image: "http://localhost:3000/images/PP2-640x128.jpg",
		descriptor: "Business School",
		description: "Description of provider's product/service. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
	},
	{
		name: "Provider Name",
		image: "http://localhost:3000/images/PP3-640x128.jpg",
		descriptor: "Performing Arts School",
		description: "Description of provider's product/service. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
	},
		{
		name: "Provider Name",
		image: "http://localhost:3000/images/PP4-640x128.jpg",
		descriptor: "School of Advertising",
		description: "Description of provider's product/service. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
	}
];

function seedDB(){
   //Remove all current providers
	Provider.remove({}, function(err){
		if(err){
			console.log("SeedDB() in seed.js error");
		}
		console.log("Provider Index removed!");
	   //Add a few providers
	   data.forEach(function(seed){
		   Provider.create(seed, function(err, provider){ 
			   if(err){
				   console.log(err);
			   } else {
				   console.log("Seeded the Provider Index!");
					//Create a REVIEW
					Review.create(
					{
						text: "No reviews as yet. Be the first!",
						author: "admin"
					}, function(err, review){
							if(err){
							console.log(err);
							} else {
								provider.reviews.push(review);
								provider.save();
								console.log("Created add a review button! ?? Nonsensical in seeds.js ??");
							}
						});
                }
            });
        });
    }); 
}

module.exports = seedDB;