// // Import necessary modules
// const express = require('express');
// const bodyParser = require('body-parser');
// // Create an Express app
// const app = express();
// const PORT = process.env.PORT || 3000;
// // Middleware for parsing JSON bodies
// app.use(bodyParser.json());
// // Dummy data to store to-do items
// let todos = [];
// // API endpoints
// // Get all to-dos
// app.get('/todos', (req, res) => {
//     res.json(todos);
// });
// // Add a new to-do
// app.post('/todos', (req, res) => {
//     const todo = req.body;
//     todos.push(todo);
//     res.status(201).send('Todo added successfully');
// });
// // Delete a to-do by ID
// app.delete('/todos/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     todos = todos.filter(todo => todo.id !== id);
//     res.send('Todo deleted successfully');
// });
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// React

// Reply