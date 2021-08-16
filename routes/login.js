const {Router} = require('express')
const passport = require('passport')

var app = Router()

var csrf = require("csurf")()

app.get('/', csrf, (req,res) => {
	res.render('login', {
		title: "Login",
		csrf: req.csrfToken()
	})
})

app.post('/', csrf, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

module.exports = app