import React from "react";

function TodoItem({ item, deleteTask, onComplete }) {
    return (<div key={item.time} className="todo-item">
        <input type="checkbox" 
            onChange={() => onComplete(item.time)} 
            checked={item.completed}/>
        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}> {item.text}</span>
        <button onClick={() => {
            deleteTask(item.time);
        }}>Delete</button>
        <button onClick={() => {
            onComplete(item.time);
        }}>{item.completed ? 'Not Completed' : 'Completed'}</button>
    </div>)
}

export default TodoItem;