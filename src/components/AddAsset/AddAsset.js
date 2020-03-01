import React, { useState } from 'react';

import { useStoreActions } from 'easy-peasy';

export const AddAsset = () => {
  const addAsset = useStoreActions(actions => actions.wallet.addAsset);
  const [showButton, setShowButton] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');

  const handleSymbolChange = event => {
    if (event.target.value.length > 2) {
      setShowButton(true);
      setSymbol(event.target.value);
    }
  };

  const handleBalanceChange = event => {
    if (event.target.value === '') {
      return;
    }
    setBalance(event.target.value);
  };

  const handleAddAsset = payload => {
    addAsset(payload);
    setSymbol('');
    setBalance('');

    const list = document.querySelectorAll(
      '.add-asset .symbol, .add-asset  .balance'
    );

    list.forEach(node => {
      node.value = '';
    });

    setShowButton(false);
  };

  return (
    <div className='add-asset'>
      <input
        className='symbol'
        onChange={handleSymbolChange}
        type='text'
        placeholder='BTC or XRP or...'
      />
      <input
        className='balance'
        onChange={handleBalanceChange}
        type='number'
        placeholder='balance'
      />

      {showButton && (
        // <button onClick={() => addAsset({ symbol, balance })}>Add</button>
        <button onClick={() => handleAddAsset({ symbol, balance })}>Add</button>
      )}
    </div>
  );
};
