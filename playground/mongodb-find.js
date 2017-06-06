const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	// Get all todos that are not completed
	// db.collection('Todos')
	// .find({completed: false})
	// .toArray()
	// .then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch TODOs', err);
	// });

	// How many todos in total
	db.collection('Todos')
	.find()
	.count()
	.then(
		(count) => {
			console.log('Todos count: ' + count);
		},
		(err) => {
			console.log('Unable to fetch TODOs', err);s
		});

	db.close();
});