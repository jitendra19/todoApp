import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";


function TodoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });
    const [text, setText] = useState("");

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(tasks));
      }, [tasks]);

    const addItem = (text) => {
        if(!!text) {
            const task = {
                time: Date.now(),
                text,
                completed: false
            }
            setText('');
            setTasks([...tasks, task]);
        }        
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.time !== id ));
    }

    const onComplete = (id) => {
        const updatedTasks = tasks.map((item) =>  {
            if(item.time === id) {
                item.completed = !item.completed;
                item.time = Date.now();
            }
            return item;
        });
        setTasks([...updatedTasks.filter((a)=> !a.completed), ...updatedTasks.filter((a)=> a.completed)]);
    }

    return <div className="todo-list">
        <div className="input">
            <input value={text} onChange={(e) => {setText(e.target.value)}}
                onKeyDown={(e)=> {                    
                    if(e.key === 'Enter') {
                        // alert(text);
                        addItem(text);
                    }
                }} 
                placeholder="input here..."></input>
            <button onClick={(e) => {
                // e.preventDefault();
                // alert(text);
                addItem(text);
            }}>Add Item </button>
        </div>
        {tasks.map((item) => {
            return <TodoItem key={item.time} item={item} deleteTask={deleteTask} onComplete={onComplete} />;
        })}
    </div>
}
export default TodoList;