import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useStoreState } from 'easy-peasy';

export const WalletGraph = () => {
  let walletGraphData = useStoreState((state) => state.wallet.walletGraphData);
  walletGraphData = {
    datasets: [
      {
        data: walletGraphData.numbers,
        backgroundColor: walletGraphData.backgroundColor,
        hoverBackgroundColor: '#9c27b0',
        hoverBorderColor: '#d05ce3',
      },
    ],

    labels: walletGraphData.labels,
  };

  return (
    <div className='wallet-graph box'>
      <h2>Graphique des cryptos dont le prix a été trouvé</h2>

      <div className='dughnut'>
        <Doughnut data={walletGraphData} width='100' />
      </div>
    </div>
  );
};
