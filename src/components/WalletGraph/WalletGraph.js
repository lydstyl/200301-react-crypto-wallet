import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState } from 'easy-peasy';

export const WalletGraph = () => {
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

  return (
    <div className='wallet-graph'>
      <h2>Portefeuille des cryptos dont le prix a été trouvé</h2>
      <Doughnut data={walletGraphData} />
    </div>
  );
};
