import React from 'react';
import logo from './logo.svg';
import './App.css';
import SlidingWindowScroll from "./SlidingWindowScroll";
// import ListRenderer from "./ListRenderer";
import MY_ENDLESS_LIST from './Constants';
function App() {
  return (
    <div className="App">
     <h1>Sliding Window Infinite Scroll</h1>
      <SlidingWindowScroll list={MY_ENDLESS_LIST} height={195}/>
    </div>
  );
}

export default App;
