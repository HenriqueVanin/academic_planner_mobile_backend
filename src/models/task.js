const mongoose = require('../database');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    project: {
        type: String,
        ref: 'Project',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    date: {
        type:Date,
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
    },
    priority: {
        type: String,
        require: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;