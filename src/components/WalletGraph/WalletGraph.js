import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const WalletGraph = () => {
  const assets = useStoreState(state => state.wallet.assets);

  const updateAssetsWithPrices = useStoreActions(
    actions => actions.wallet.updateAssetsWithPrices
  );

  const [data, setData] = useState(
    // https://www.chartjs.org/docs/latest/charts/doughnut.html
    {
      datasets: [
        {
          data: [10, 20, 40]
        }
      ],

      labels: ['USD', 'BTC', 'ETH']
    }
  );

  useEffect(() => {
    updateAssetsWithPrices(assets);
  }, []);

  return (
    <div className='wallet-graph'>
      <Doughnut data={data} />
    </div>
  );
};
