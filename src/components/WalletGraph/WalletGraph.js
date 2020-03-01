import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const WalletGraph = () => {
  const assets = useStoreState(state => state.wallet.assets);

  const updateAssetsWithPrices = useStoreActions(
    actions => actions.wallet.updateAssetsWithPrices
  );

  console.log('1 assetsddd', assets);

  updateAssetsWithPrices(assets);

  // const setAssets = useStoreActions(actions => actions.wallet.removeAsset);
  // const setCurrentTotal = useStoreActions(
  //   actions => actions.wallet.setCurrentTotal
  // );

  // const [usdValues, setUsdValues] = useState([10, 20, 30]);
  // const [labels, setLabels] = useState(['USD', 'BTC', 'ETH']);

  // const [datas, setDatas] = useState({});
  const [data, setData] = useState(
    // https://www.chartjs.org/docs/latest/charts/doughnut.html
    {
      datasets: [
        {
          data: [10, 20, 40]
          // data: usdValues
        }
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ['USD', 'BTC', 'ETH']
      // labels: labels
    }
  );

  // useEffect(() => {}, [assets, setAssets]);

  return (
    <div className='wallet-graph'>
      {/* <pre>{JSON.stringify(datas, null, 4)}</pre>
      <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <Doughnut data={data} />
    </div>
  );
};
