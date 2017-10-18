const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:'59e767308c54a0cac1cbe2d8'}).then((todo)=>{
//     console.log(todo);
// });
//
// Todo.findByIdAndRemove('59e767308c54a0cac1cbe2d8').then((todo)=>{
//     console.log(todo);
// });