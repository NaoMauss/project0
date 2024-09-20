<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Todo {
  _id: string
  title: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodoTitle = ref('')

const fetchTodos = async () => {
  const response = await axios.get('http://localhost:3000/todos')
  todos.value = response.data
}

const addTodo = async () => {
  if (newTodoTitle.value.trim()) {
    await axios.post('http://localhost:3000/todos', { title: newTodoTitle.value })
    newTodoTitle.value = ''
    await fetchTodos()
  }
}

const toggleTodo = async (todo: Todo) => {
  await axios.put(`http://localhost:3000/todos/${todo._id}`, { completed: !todo.completed })
  await fetchTodos()
}

const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:3000/todos/${id}`)
  await fetchTodos()
}

onMounted(fetchTodos)
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <div>
      <input v-model="newTodoTitle" @keyup.enter="addTodo" placeholder="Add a new todo" />
      <button @click="addTodo">Add</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo._id">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo)" />
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.title }}
        </span>
        <button @click="deleteTodo(todo._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  color: var(--accent-color);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

li input[type="checkbox"] {
  margin-right: 0.5rem;
}

li button {
  margin-left: 0.5rem;
  background-color: #e74c3c;
}
</style>