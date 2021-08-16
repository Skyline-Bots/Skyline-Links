const { Router } = require('express')
var app = Router()

const links = require("../models/Link")

const config = require('../config.json')

var randomOrg = require('random-org')
var random = new randomOrg({ apiKey: config.key })

app.get(`/:id`, async (req,res) => {
	var link = await links.findOne({ id: req.params.id })
	if (!link) return res.status(404).send({
		error: true,
		message: "That link doesn't exist"
	})

	res.render("redirect", {
		link: link.url
	})
})

app.post('/create', async (req,res) => {
	var body = req.body;

	var r = await random.generateStrings({
		n: 1,
		length: 5,
		characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
		
	})

	var l = new links({
		id: r.random.data[0],
		url: body.url,
		madeBy: body.creator
	})
	
	l.save()

	return res.status(201).send({
		created: true,
		url: `https://skbts.ml/link/${l.id}`
	})

})

module.exports = app