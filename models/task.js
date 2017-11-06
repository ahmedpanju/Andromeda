var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Moodify');

var db = mongoose.connection;

var taskSchema = mongoose.Schema({
    email: {
        type: String    
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Task', taskSchema);

module.exports.createTask = function(newTask, callback) {
    newTask.save(callback);
}