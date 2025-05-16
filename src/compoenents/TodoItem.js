import React, { useState } from "react";

function TodoItem({ item, deleteTask, onComplete }) {
    const [showDelete, setShowDelete] = useState(false);
    return (<div key={item.time} className="todo-item" onMouseEnter={(e) => {
            setShowDelete(true);
        }} onMouseLeave={()=> {
            setShowDelete(false);
        }}>
        <input type="checkbox" 
            onChange={() => onComplete(item.time)} 
            checked={item.completed}/>
        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}> {item.text}</span>
        <button style = {{visibility: showDelete ? "visible" : "hidden"}} onClick={() => {
            deleteTask(item.time);
        }}>Delete</button>
        <button onClick={() => {
            onComplete(item.time);
        }}>{item.completed ? 'Not Completed' : 'Completed'}</button>
    </div>)
}

export default TodoItem;