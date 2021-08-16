const mongoose = require('mongoose')

const link = mongoose.Schema({
	id: { type: String, required: true },
	url: { type: String, default: "https://skylinebots.ml" },
	madeBy: { type: String, required: true }
})

module.exports = mongoose.model("links", link)