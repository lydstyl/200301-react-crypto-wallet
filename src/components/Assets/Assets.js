import React from 'react';

import { useStoreState } from 'easy-peasy';

export const Assets = () => {
  const assets = useStoreState(state => state.assets);

  const domAssets = Object.keys(assets).map(symbol => (
    <li key={symbol}>
      {symbol}: {assets[symbol].balance}
    </li>
  ));

  return <ul className='assets'>{domAssets}</ul>;
};
