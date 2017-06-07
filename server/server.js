const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// ##############################################
// CREATE Todo
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
			console.log('Failed to save todo');
	});
});

// ##############################################
// LIST Todos
app.get('/todos', (req,res) => {
	Todo.find().then(
		(todos) => {
			res.send({todos});
		},
		(e) => {
			res.status(400).send(e);
		});
});

// ##############################################
// READ Todo
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) =>{
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

// ##############################################
// UPDATE Todo
// app.get('/todos/:id', (req, res) => {
// 	var id = req.params.id;

// 	if(!ObjectID.isValid(id)){
// 		return res.status(404).send();
// 	}

// 	Todo.findById(id).then((todo) =>{
// 		if(!todo) {
// 			return res.status(404).send();
// 		}
// 		res.send({todo});
// 	}).catch((e) => {
// 		res.status(400).send();
// 	});
// });

// ##############################################
// DELETE Todo
app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) =>{
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});


// ##############################################
// START SERVER
app.listen(port, () => {
	console.log('Server listening on port ' + port);
});

module.exports = {app};