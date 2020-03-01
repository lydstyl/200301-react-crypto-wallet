import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const WalletGraph = () => {
  const assets = useStoreState(state => state.wallet.assets);
  const setAssets = useStoreActions(actions => actions.wallet.removeAsset);

  // https://www.chartjs.org/docs/latest/charts/doughnut.html
  const data = {
    datasets: [
      {
        data: [10, 20, 30]
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['USD', 'BTC', 'ETH']
  };

  useEffect(() => {
    let totalUsdValue = 0;

    fetch('https://api.coincap.io/v2/assets')
      .then(response => {
        return response.json();
      })
      .then(data => {
        data = data.data.filter(crypto =>
          Object.keys(assets).includes(crypto.symbol)
        );

        data.forEach(asset => {
          const symbol = asset.symbol;
          const priceUsd = parseFloat(asset.priceUsd);
          const balance = assets[asset.symbol].balance;
          const usdValue = priceUsd * balance;
          totalUsdValue += usdValue;
          assets[symbol].price = priceUsd;
          assets[symbol].usdValue = usdValue;
        });

        Object.keys(assets).forEach(asset => {
          assets[asset].percent = assets[asset].usdValue / totalUsdValue;
        });

        document.querySelector('pre.json-wallet').innerText = JSON.stringify(
          assets,
          null,
          4
        );

        setAssets(assets);
      })
      .catch(err => {
        console.log(err);
      });
  }, [assets, setAssets]);

  return (
    <>
      <pre className='json-wallet'></pre>
      <pre className='json-wallet'></pre>
      <div className='wallet-graph'>
        <Doughnut data={data} />
      </div>
    </>
  );
};
