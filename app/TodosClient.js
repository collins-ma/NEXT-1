"use client"; // Mark this as a client component
import { useState } from 'react';
import axios from 'axios';

export default function TodosClient({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  // Create a new Todo
  const createTodo = async () => {
    if (!newTodo) return;
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: newTodo,
      completed: false,
    });
    setTodos([res.data, ...todos]); // Add the new todo to the list
    setNewTodo(''); // Clear the input field
  };

  // Delete a Todo
  const deleteTodo = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id)); // Remove the deleted todo
  };

  // Toggle a Todo's completion status
  const toggleTodo = async (id, completed) => {
    const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: !completed,
    });
    setTodos(todos.map(todo => todo.id === id ? res.data : todo)); // Update the list
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List (SSG with ISR)</h1>

      {/* Create Todo Input */}
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={createTodo}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Todo
        </button>
      </div>

      {/* Display Todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="mb-2 flex items-center justify-between">
            <span
              className={`cursor-pointer text-lg ${todo.completed ? 'line-through' : ''}`}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}