import React from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const Assets = () => {
  const { uid } = useStoreState((state) => state.user);
  const { assets, sortedAssets, currentTotal, currentBTCTotal } = useStoreState(
    (state) => state.wallet
  );

  const deleteAsset = useStoreActions((actions) => actions.wallet.deleteAsset);

  const handleRemoveAsset = (event) => {
    const payload = {
      cryptoToRemove: event.target.parentNode.querySelector('.symbol')
        .innerText,
      assets,
      uid,
    };

    deleteAsset(payload); // this is a thunk
  };

  const notCounted = sortedAssets.notCounted.map((asset) => (
    <li key={asset.label}>
      <span className='remove-asset' onClick={handleRemoveAsset}>
        X
      </span>{' '}
      <span className='symbol'>{asset.label}</span>
      <span className='balance'>: {asset.balance}</span>
    </li>
  ));

  const counted = sortedAssets.counted.map((asset) => (
    <li
      key={asset.label}
      style={{ borderBottom: `6px solid ${asset.randomColor}` }}
    >
      <span className='remove-asset' onClick={handleRemoveAsset}>
        X
      </span>{' '}
      <span className='symbol'>{asset.label}</span>
      <span className='value'>
        : <span className='balance'>{asset.balance}</span> *{' '}
        {asset.usdPrice.toString().substring(0, 7)} ={' '}
        {Math.round(asset.usdValue).toLocaleString('fr')} (
        {asset.btcValue && asset.btcValue.toFixed(3)})
      </span>
    </li>
  ));

  return (
    <div className='box'>
      <h3>
        Prix trouvés. Total = {Math.round(currentTotal).toLocaleString('fr')} ${' '}
        ({currentBTCTotal && currentBTCTotal.toFixed(3)} BTC)
      </h3>
      <ul className='assets counted'>{counted}</ul>

      <h3>Prix non trouvés</h3>
      <ul className='assets not-counted'>{notCounted}</ul>
    </div>
  );
};
