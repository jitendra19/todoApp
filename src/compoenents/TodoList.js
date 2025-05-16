import React, { useState } from "react";
import TodoItem from "./TodoItem";


function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

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
        setTasks(tasks.map((item) =>  {
            if(item.time === id) {
                item.completed = !item.completed;
            }
            return item;
        }));
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