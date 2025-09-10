
import React from "react";
// defining props for generic List component
export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode; // takes an item and returns a React node
  getKey: (item: T) => string; // function to get unique key for each item
}
// a generic list that can be used for any type 
export function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={getKey(item)}>
          {renderItem(item)}
        </React.Fragment>
      ))}
    </>
  );
}
