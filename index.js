console.clear()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const config = require("./config.json")

require('./db.js')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const mongo = require('connect-mongo')

const csrf = require('csurf')

const link = require(`./models/Link`)

const User = require('./models/User')

passport.use(new LocalStrategy({ session: true }, (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
			
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password !== password) { return done(null, false); }
      return done(null, user);
    })
  }
));

app.use(session({
	secret: config.secret,
	resave: false,
	saveUninitialized: false,
	store: mongo.create({
		mongoUrl: config.connectionString,
		mongoOptions: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		},
		collectionName: "linksessions"
	})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/login', require('./routes/login'))
app.use('/link', require('./routes/links'))

app.set('view engine', 'ejs')
app.set('views', __dirname+"/views/")

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

app.get(['/', '/home'], async(req,res) => {
	if (!req.isAuthenticated()) return res.redirect("/login")

	return res.render("home", {
		user: req.user,
		auth: req.isAuthenticated()
	})
})
console.clear()
var listener = app.listen(1000, () => {
	console.log(`Link shortener server listening on port ${listener.address().port}`)
})