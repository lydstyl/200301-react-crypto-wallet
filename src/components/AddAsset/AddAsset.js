import React from 'react';

// function TodoList() {
//   const todos = useStoreState(state => state.todos.items)
//   const add = useStoreActions(actions => actions.todos.add)
//   return (
//     <div>
//       {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
//       <AddTodo onAdd={add} />
//     </div>
//   )
// }

export const AddAsset = () => {
  // const todos = useStoreState(state => state.todos.items);

  // console.log(todos);

  return (
    <form className='add-asset'>
      <input type='text' placeholder='BTC or XRP or...' />
      <input type='number' placeholder='balance' />
    </form>
  );
};
