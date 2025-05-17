import React from 'react';
import TodoList from './compoenents/TodoList';
import InfiniteScroll from './compoenents/InfiniteScroll';

function App() {
    return <div className="App">
        <TodoList /> 
        <InfiniteScroll />
    </div>
}

export default App;
