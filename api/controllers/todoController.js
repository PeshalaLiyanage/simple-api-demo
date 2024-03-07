const {Todo}  = require('../db');

async function getAllTodos(req, res) {
    try {
        const todo = await Todo.findAll({where:{UserId:res.userId}})

        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createTodo(req, res) {
    try {
        const { description ,date} = req.body;
        const todo = await Todo.create({description,date,status:true, UserId:res.userId})
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
}

module.exports = {
    getAllTodos,
    createTodo,
};