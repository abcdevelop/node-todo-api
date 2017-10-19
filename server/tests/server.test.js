const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app}=require('../server');
const {Todo}=require('../models/todo');

const todos = [{
        _id: new ObjectID(),
        text:"First todo"
    },
    {
        _id: new ObjectID(),
        text:"Second todo",
        completed:true,
        completedAt:333
    }];

beforeEach((done)=>{
    //delete all the todos
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
});


describe('POST /todos',()=>{

    it('should create a new todo',(done)=>{
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });

    it('should not create todo width invalid body data',(done)=>{
        request(app)
            .post('/todos')
            .send({text:""})
            .expect(400)
            .end((err,res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            });
    });
})

describe('GET /todos',() => {
    it('should get all todos',(done) => {
       request(app)
           .get('/todos')
           .expect(200)
           .expect((res) => {
                expect(res.body.todos.length).toBe(2);
           })
           .end(done);
    });
});



describe('GET /todos/:id',() => {
    it('should return todo doc',(done) => {
        var hexId=todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        var hexId=new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid',(done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });

});


describe('DELETE /todos/:id',() => {
    it('should remove a todo',(done) => {
        var hexId=todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                //query database using findById toNotExist
                //expect(null).toNotExist();
                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=>done(e));

            });
    });

    it('should return 404 if todo not found',(done) => {
        var hexId=new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid',(done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });

});


describe('PATCH /todos/:id',() => {
    it('should update the todo',(done) => {
        var hexId=todos[0]._id.toHexString();
        var body={
            text:"This should be the new text",
            completed:true
        };
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed',(done) => {
        var hexId=todos[1]._id.toHexString();
        var body={
            text:"Second updated text !!",
            completed:false
        };
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        var hexId=new ObjectID().toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid',(done) => {
        request(app)
            .patch('/todos/123abc')
            .expect(404)
            .end(done);
    });

});
