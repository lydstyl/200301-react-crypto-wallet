import React, { useState } from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const AddAsset = () => {
  const [showButton, setShowButton] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');

  const { uid, email } = useStoreState(state => state.user);
  const assets = useStoreState(state => state.wallet.assets);

  const { addOneAsset } = useStoreActions(actions => actions.wallet);

  const handleSymbolChange = event => {
    const inputSymbol = event.target.value;

    if (inputSymbol.length > 2) {
      let symbolExistInPage = false;

      document.querySelectorAll('.symbol').forEach(symbolNode => {
        const symbol = symbolNode.innerText;

        if (inputSymbol.toUpperCase() === symbol) {
          symbolExistInPage = true;
        }
      });

      if (symbolExistInPage) {
        setShowButton(false);
        return;
      }

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
      <h2>Mon portefeuille</h2>
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

      {showButton && <button onClick={handleAddAsset}>Add</button>}
    </div>
  );
};
