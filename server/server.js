const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// CREATE a Todo
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then(
		(doc) =>{
			res.send(doc);
			console.log('Todo saved', doc);
		},
		(err) => {
			res.status(400).send(err);
			console.log('Failed to save todo', err);
	});
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});