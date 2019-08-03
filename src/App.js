import React from 'react';
import logo from './logo.svg';
import './App.css';
import WithVisibleItemsCount from "./WithVisibleItemsCount";
import ListRenderer from "./ListRenderer";

const MY_ENDLESS_LIST = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
function App() {
  return (
    <div className="App">
     <h1>Creating Lazy Loader</h1>
      <WithVisibleItemsCount
        render={props => {
          const {visibleItemsCount, bottomRef, rootRef} = props;
          const visibleListItems = MY_ENDLESS_LIST.slice(0, visibleItemsCount);
          return <ListRenderer list={visibleListItems} bottomRef={bottomRef} rootRef={rootRef}/>;
        }}
      />
    </div>
  );
}

export default App;
