import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState } from 'easy-peasy';

export const WalletGraph = () => {
  const assets = useStoreState(state => state.wallet.assets);

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
    console.log('effect');
    console.log(assets);

    // const myAssets = {
    //   BTC: { balance: 2.17554857 },
    //   ETH: { balance: 0 },
    //   XRP: { balance: 10491.17282557 },
    //   BCH: { balance: 5.13250079 },
    //   LTC: { balance: 9.31198211 }
    // };

    const myAssets = assets;

    let totalUsdValue = 0;

    fetch('https://api.coincap.io/v2/assets')
      .then(response => {
        return response.json();
      })
      .then(data => {
        data = data.data.filter(crypto =>
          Object.keys(myAssets).includes(crypto.symbol)
        );

        data.forEach(asset => {
          const symbol = asset.symbol;
          const priceUsd = parseFloat(asset.priceUsd);
          const balance = myAssets[asset.symbol].balance;
          const usdValue = priceUsd * balance;
          totalUsdValue += usdValue;
          myAssets[symbol].price = priceUsd;
          myAssets[symbol].usdValue = usdValue;
        });

        Object.keys(myAssets).forEach(asset => {
          myAssets[asset].percent = myAssets[asset].usdValue / totalUsdValue;
        });

        // console.log(myAssets);
        document.querySelector('pre').innerText = JSON.stringify(
          myAssets,
          null,
          4
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, [assets]);

  return (
    <>
      <pre className='json'>json</pre>
      <div className='wallet-graph'>
        <Doughnut data={data} />
      </div>
    </>
  );
};
