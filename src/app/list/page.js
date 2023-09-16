"use client"
import React, { useState } from "react";

function ConnectedList() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1", parent: null, isSelected: false },
    { id: 2, text: "Item 2", parent: 1, isSelected: false },
    { id: 3, text: "Item 3", parent: 1, isSelected: false },
    { id: 4, text: "Item 4", parent: 2, isSelected: false },
    { id: 5, text: "Item 5", parent: 3, isSelected: false },
  ]);

  const toggleSelection = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, isSelected: !item.isSelected };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setItems(updatedItems);
  };

  const renderItems = (parentId) => {
    return items
      .filter((item) => item.parent === parentId)
      .map((item) => (
        <li
          key={item.id}
          className={`${
            item.isSelected ? "bg-blue-200" : ""
          } border-t-2 border-blue-500`}
        >
          <span
            className="cursor-pointer"
            onClick={() => toggleSelection(item.id)}
          >
            {item.text}
          </span>
          <ul>{renderItems(item.id)}</ul>
        </li>
      ));
  };

  return (
    <div className="ml-4">
      <ul>{renderItems(null)}</ul>
    </div>
  );
}

export default ConnectedList;
