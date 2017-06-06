const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//deleteMany
	// db.collection('Todos')
	// .deleteMany({text: 'eat shit'})
	// .then(
	// 	(result) => {
	// 		console.log(result);
	// 	},
	// 	(err) => {

	// 	});

	//deleteOne
	// db.collection('Todos')
	// .deleteOne({text: 'eat shit'})
	// .then(
	// 	(result) => {
	// 		console.log(result);
	// 	},
	// 	(err) => {

	// 	});

	//findOneAndDelete 	
	db.collection('Todos')
	.findOneAndDelete({completed: false})
	.then(
		(result) => {
			console.log(result);
		},
		(err) => {

		});

	// db.close();
});