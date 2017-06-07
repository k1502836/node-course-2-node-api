const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// DUMMY DATA
const dummyTodos = [
	{_id: new ObjectID(), text:'first todo'},
	{_id: new ObjectID(), text:'second todo'}
];


beforeEach((done) => {
	Todo.remove({})
		.then(() => {
			return Todo.insertMany(dummyTodos);
		})
		.then(() => done());
});

// TEST POST TODOS
describe('POST /todos', () => {
	it('should create a new todo',
		(done) => {
			var text = 'Test todo text';

			request(app)
				.post('/todos')
				.send({text})
				.expect(200)
				.expect((res) => {
					expect(res.body.text).toBe(text);
				})
				.end((err, res) => {
					if(err){
						return done(err);
					}
					Todo
						.find({text})
						.then(
							(todos) => {
								expect(todos.length).toBe(1);
								expect(todos[0].text).toBe(text);
								done();
							})
						.catch((e) => done(e));
				});
		});
	it('should not create todo with invalid body data',
		(done) => {
			var text = '       ';

			request(app)
				.post('/todos')
				.send({text})
				.expect(400)
				.end((err,res) => {
					if(err) {
						return done(err);
					}
					Todo
						.find()
						.then((todos) => {
							expect(todos.length).toBe(dummyTodos.length);
							done();
						})
						.catch((e) => done(e));
				});
		});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(dummyTodos.length);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return the todo', (done) => {
		request(app)
			.get(`/todos/${dummyTodos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(dummyTodos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/5936ad4eb6958d310d5849a3`) // valid id but can't find
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.get(`/todos/132`) // invalid id
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) =>{
		var hexID = dummyTodos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${hexID}`)
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo._id).toBe(hexID);
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}
				Todo.findById(hexID).then((todo) =>{
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});
	it('should return 404 if todo not found', (done) =>{
		request(app)
			.delete(`/todos/5936ad4eb6958d310d5849a3`) // valid id but can't find
			.expect(404)
			.end(done);
	});
	it('should return 404 if ObjectID is invalid', (done) =>{
		request(app)
			.delete(`/todos/132`) // invalid id
			.expect(404)
			.end(done);
	});
});