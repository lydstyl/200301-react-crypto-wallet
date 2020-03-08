import React, { useState } from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const AddAsset = () => {
  const [showButton, setShowButton] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');

  const { uid, email } = useStoreState(state => state.user);
  const assets = useStoreState(state => state.wallet.assets);

  const addOneAsset = useStoreActions(actions => actions.wallet.addOneAsset);

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

  const handleAddAsset = () => {
    const payload = {
      toAdd: { symbol: symbol.toUpperCase(), balance },
      assets,
      user: { uid, email }
    };

    addOneAsset(payload);

    // reset form
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

      {showButton && <button onClick={() => handleAddAsset()}>Add</button>}
    </div>
  );
};
