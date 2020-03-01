import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export const WalletGraph = () => {
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

  return (
    <div className='wallet-graph'>
      <Doughnut data={data} />
    </div>
  );
};
