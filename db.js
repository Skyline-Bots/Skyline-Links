const mongoose = require('mongoose')

const config = require('./config.json')

mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log(`Connected to Mongoose`)
	
})
.catch(err => {
	console.error(err)
})