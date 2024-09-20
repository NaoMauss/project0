import fastify from "fastify";
import z from "zod";
import cors from "@fastify/cors";
import mongoose from "mongoose";

const app = fastify();

app.register(cors);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todolist");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Define Todo schema
const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// Create a new todo
const createTodoSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

app.post<{ Body: { title: string } }>("/todos", async (req, res) => {
  const { body } = createTodoSchema.parse(req);
  const todo = new Todo({ title: body.title, completed: false });
  await todo.save();
  res.status(201).send(todo);
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// Update a todo
const updateTodoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    completed: z.boolean().optional(),
  }),
});

app.put<{ Params: { id: string }, Body: { title?: string, completed?: boolean } }>("/todos/:id", async (req, res) => {
  const { params, body } = updateTodoSchema.parse(req);
  const todo = await Todo.findByIdAndUpdate(params.id, body, { new: true });
  if (!todo) {
    res.status(404).send({ error: "Todo not found" });
    return;
  }
  res.send(todo);
});

// Delete a todo
const deleteTodoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

app.delete<{ Params: { id: string } }>("/todos/:id", async (req, res) => {
  const { params } = deleteTodoSchema.parse(req);
  const todo = await Todo.findByIdAndDelete(params.id);
  if (!todo) {
    res.status(404).send({ error: "Todo not found" });
    return;
  }
  res.status(204).send();
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on ${3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();