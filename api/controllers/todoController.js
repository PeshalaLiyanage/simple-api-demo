async function getAllTodos(req, res) {
    try {
        res.json(["Task1","task2"]);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createTodo(req, res) {
    try {
        const { description } = req.body;
        const todo = await todoService.createTodo(description);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
}

module.exports = {
    getAllTodos,
    createTodo,
};