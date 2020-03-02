import React from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const Assets = () => {
  const assets = useStoreState(state => state.wallet.assets);
  const sortedAssets = useStoreState(state => state.wallet.sortedAssets);
  const currentTotal = useStoreState(state => state.wallet.currentTotal);

  const deleteAsset = useStoreActions(actions => actions.wallet.deleteAsset);

  const handleRemoveAsset = event => {
    const payload = {
      cryptoToRemove: event.target.parentNode.querySelector('.symbol')
        .innerText,
      assets
    };
    deleteAsset(payload); // this is a thunk
  };

  const notCounted = sortedAssets.notCounted.map(asset => (
    <li key={asset.label}>
      <span className='remove-asset' onClick={handleRemoveAsset}>
        X
      </span>{' '}
      <span className='symbol'>{asset.label}</span>
      <span className='balance'>: {asset.balance}</span>
    </li>
  ));

  const counted = sortedAssets.counted.map(asset => (
    <li key={asset.label}>
      <span className='remove-asset' onClick={handleRemoveAsset}>
        X
      </span>{' '}
      <span className='symbol'>{asset.label}</span>
      <span className='value'>
        : <span className='balance'>{asset.balance}</span> * {asset.usdPrice} ={' '}
        {asset.usdValue}
      </span>
    </li>
  ));

  return (
    <>
      <h2>Non comptés car prix USD non trouvé par l'API</h2>
      <ul className='assets not-counted'>{notCounted}</ul>

      <h2>Comptés car prix USD trouvé par l'API. Total = {currentTotal}$</h2>
      <ul className='assets counted'>{counted}</ul>
    </>
  );
};
