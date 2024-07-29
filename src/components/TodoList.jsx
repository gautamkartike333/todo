
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentTodo({
      text: todos[index],
      index: index,
    });
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      text: e.target.value,
    });
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === currentTodo.index ? currentTodo.text : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <div className='m-2'>
      <h1 className='font-semibold text-4xl'>Todo List</h1>
     <div  className='m-10 '> <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />

      <button onClick={addTodo} className="m-5 bg-slate-500 p-1 rounded">Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)} className="m-5 bg-blue-300 p-1 rounded">Delete</button>
            <button onClick={() => startEditing(index)} className="m-5 bg-blue-300 p-1 rounded">Edit</button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div>
          <input
            type="text"
            value={currentTodo.text}
            onChange={handleEditInputChange}
            placeholder="Edit todo"
          />
          <button onClick={saveEdit}>Save</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default TodoList;
