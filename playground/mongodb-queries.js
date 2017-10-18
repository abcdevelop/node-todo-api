const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// // Todo
// var id = '59e7285550b513d017a2374c';
//
// if(!ObjectID.isValid(id)){
//     return console.log('ID not valid')
// };

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('todos=',todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('todo=',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//
//     console.log('Todo By Id =',todo);
// }).catch((e)=>console.log(e));


// User
var id = '59e709edcfac4b441dbec301';

User.findById(id).then((user)=>{
    if(!user){
        return console.log('Unable to find the user');
    }

    console.log(JSON.stringify(user,undefined,2));
},(e)=>console.log(e));

