const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

// Create a new task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const task = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a single task
app.get("/tasks/:id", (req, res) => {
  app.get("/tasks/:id", (req, res) => {
    const task = task.find((t) => t.id == parsedInt(req.params.id)); // <-- here
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// update a task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id == parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id == parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Task management app listening at http://localhost:${port}`);
});
