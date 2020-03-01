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

  return (
    <div className='add-asset'>
      <input
        onChange={handleSymbolChange}
        type='text'
        placeholder='BTC or XRP or...'
      />
      <input
        onChange={handleBalanceChange}
        type='number'
        placeholder='balance'
      />

      {showButton && (
        <button onClick={() => addAsset({ symbol, balance })}>Add</button>
      )}
    </div>
  );
};
