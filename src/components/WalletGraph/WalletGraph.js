import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const WalletGraph = () => {
  const assets = useStoreState(state => state.wallet.assets);

  // const sortedAssets = useStoreState(state => state.wallet.sortedAssets);

  let walletGraphData = useStoreState(state => state.wallet.walletGraphData);
  walletGraphData = {
    datasets: [
      {
        data: walletGraphData.numbers,
        backgroundColor: walletGraphData.backgroundColor
      }
    ],

    labels: walletGraphData.labels
  };

  const updateAssetsWithPrices = useStoreActions(
    actions => actions.wallet.updateAssetsWithPrices
  );

  useEffect(() => {
    //updateAssetsWithPrices(assets); // this is a thunk
    // eslint-disable-next-line
  }, []);

  return (
    <div className='wallet-graph'>
      <h2>Portefeuille des cryptos dont le prix a été trouvé</h2>
      <Doughnut data={walletGraphData} />
    </div>
  );
};
