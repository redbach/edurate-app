const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      flash          = require("connect-flash"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      Provider       = require("./models/provider"),
      Review         = require("./models/review"),
      User		  		= require("./models/user"),
      seedDB         = require("./seeds");

mongoose.Promise = require("bluebird"); //To get rid of Mongoose mpromise deprecation warning, in addition to doing a $ npm install bluebird --save 
 
// Get client IP address from request object ----------------------
// getClientAddress = function (req) {
//    return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
// };
// console.dir(request.headers); //return of 'undefined' needs to be fixed

// requiring routes   
const reviewRoutes      = require("./routes/reviews"),
      providerRoutes    = require("./routes/providers"),
      indexRoute        = require("./routes/index");

// incl a back-up in case DATABASEURL is lost, deleted, or corrupted.
// const url = process.env.DATABASEURL || "mongodb://localhost/service-review-app";
// mongoose.connect(url);

const url = "mongodb://localhost/eduRate-app";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // this seeds the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "now is all that is",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoute);
app.use("/providers", providerRoutes);
app.use("/providers/:id/reviews", reviewRoutes);
			
app.get("*", function(req, res){
   res.send("Page Not Found.");
});

app.listen(3000, function(){
   console.log("eduRate-app server is a go!");
});