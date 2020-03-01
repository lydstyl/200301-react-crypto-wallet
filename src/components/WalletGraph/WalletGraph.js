import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const WalletGraph = () => {
  const assets = useStoreState(state => state.wallet.assets);
  const setAssets = useStoreActions(actions => actions.wallet.removeAsset);

  const [usdValues, setUsdValues] = useState([10, 20, 30]);
  const [labels, setLabels] = useState(['USD', 'BTC', 'ETH']);

  // https://www.chartjs.org/docs/latest/charts/doughnut.html
  const data = {
    datasets: [
      {
        // data: [10, 20, 30]
        data: usdValues
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: ['USD', 'BTC', 'ETH']
    labels: labels
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

        const usdVals = [];

        Object.keys(assets).forEach(asset => {
          assets[asset].percent = assets[asset].usdValue / totalUsdValue;

          usdVals.push(assets[asset].usdValue);
        });

        setLabels(Object.keys(assets));

        setUsdValues(usdVals);

        document.querySelector('pre.json-wallet').innerText = JSON.stringify(
          assets,
          null,
          4
        );

        setAssets(assets);

        const labels = [];
        const usdValues = [];
        Object.keys(assets).forEach(asset => {
          labels.push(asset);

          console.log(assets[asset]);

          usdValues.push(assets[asset].usdValue);
        });

        console.log(assets, usdValues, labels);
      })
      .catch(err => {
        console.log(err);
      });
  }, [assets, setAssets]);

  return (
    <>
      {/* <pre className='json-wallet'></pre>
      <pre className='json-wallet'></pre> */}
      <div className='wallet-graph'>
        <Doughnut data={data} />
      </div>
    </>
  );
};
