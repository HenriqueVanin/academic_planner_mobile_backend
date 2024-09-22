const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const Project = require('../models/Project');
const Task = require('../models/Task');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate(['user']);

        return res.send({ tasks });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao carregar tarefas."});
    }
});

router.get('/projects', async (req, res) => {
    try {
        const project = await Project.find();

        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao carregar projetos."});
    }
});

router.post('/createProject', async(req,res)=>{
    try {
        const { title } = req.body;

        const project = await Project.create({ title, user: req.userId });

        await project.save();

        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao criar um novo projeto."});
    }
});

router.post('/create', async(req,res)=>{
    try {
        const { title, project, date, completed, priority} = req.body;
    
        const newTask = await Task.create({ title, date, project, completed, priority, user: req.userId });

        await newTask.save();

        return res.send({ newTask });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao criar uma nova tarefa."});
    }
});

router.put('/update', async (req, res) => {
    try {
        const { id, title, project, priority, date } = req.body;
        await Task.findByIdAndUpdate(id, {title, project }, {new:true});
    } catch (err) {
        return res.status(400).send({ error: "Erro ao atualizar tarefa."});
    }
});

router.put('/:taskId', async (req, res)=> {
    try {
        const { title, date, project, completed, priority } = req.body;

        const task = await Task.findByIdAndUpdate(req.params.taskId, {
            title, date, project, completed, priority
        }, { new: true });

        await task.save();

        return res.send({ task });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao atualizar a tarefa."});
    }
});

router.delete('/:taskId', async (req, res)=> {
    try {
        await Task.findByIdAndRemove(req.params.taskId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: "Erro ao deletar tarefa."});
    }
});

module.exports = app => app.use('/tasks', router);