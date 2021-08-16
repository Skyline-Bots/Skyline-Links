const mongoose = require('mongoose')

const User = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true, },
	id: { type: String, required: true }
})

module.exports = mongoose.model("linkusers", User)