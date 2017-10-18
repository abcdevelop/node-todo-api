const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
})


app.listen(3000,() => {
    console.log('Started o port 3000');
})

// // Todo
// var todo = new Todo({
//     text:'Cook diner'
// });
// var todo = new Todo({
//     text:'Play Chess',
//     completed:true,
//     completedAt:123456789
// });// todo.save().then((doc) => {
//     console.log('Saved todo',doc);
// },(e) => {
//     console.log('Unable to save todo');
// });



// // User
// var user = new User({
//   email:'   bruno@example.com    '
// });
// user.save().then((doc) => {
//     console.log('User saved',doc);
// },(e) => {
//     console.log('Unable to save user',e);
// });


module.exports={app};