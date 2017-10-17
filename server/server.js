const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


// Todo
var Todo = mongoose.model('Todo',{
    text:{
        type: String,
        require:true,
        minlength:1,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    completedAt:{
        type: Number,
        default:null
    }
});

// var todo = new Todo({
//     text:'Cook diner'
// });
// var todo = new Todo({
//     text:'Play Chess',
//     completed:true,
//     completedAt:123456789
// });// newTodo.save().then((doc) => {
//     console.log('Saved todo',doc);
// },(e) => {
//     console.log('Unable to save todo');
// });

// User
var User = mongoose.model('User',{
    email:{
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});


var user = new User({
  email:'   bruno@example.com    '
});
user.save().then((doc) => {
    console.log('User saved',doc);
},(e) => {
    console.log('Unable to save user',e);
});


