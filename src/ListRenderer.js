import React from "react";

class ListRenderer extends React.Component {
  render() {
    const {list, bottomRef, rootRef} = this.props;
    const lastIndex = list.length - 1;

    return (
      <ul ref={rootRef}>
        {list.map((itemName, index) => {
          const isLastIndex = (index === lastIndex);
          return (<li className="li-card" ref={isLastIndex ? bottomRef : null}>{itemName}</li>);
        })}
      </ul>
    );
  }
}

export default ListRenderer;
