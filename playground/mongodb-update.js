const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos')
	.findOneAndUpdate( //filter, update, options, callback
		{
			_id: new ObjectID('5936871a493e6e172c299273')
		},{
			$set: {
				completed: true
			}
		},{
			returnOriginal: false
		}
	) 
	.then(
		(result) => {
			console.log(result);
		},
		(err) => {

		});

	// db.close();
});