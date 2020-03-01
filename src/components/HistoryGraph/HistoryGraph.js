import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Line } from 'react-chartjs-2';

export const HistoryGraph = () => {
  const history = useStoreState(state => state.wallet.history);

  console.log(history);

  const data = {
    datasets: [
      {
        // data: [
        //   {
        //     x: 0,
        //     y: 5
        //   },
        //   {
        //     x: 10,
        //     y: 8
        //   },
        //   {
        //     x: 12,
        //     y: 20
        //   }
        // data: [5, 8, 20]
        data: history.map(instant => instant.usdValue)
      }
    ],

    labels: history.map(instant => instant.date)
  };

  return (
    <div className='history'>
      <button>Save this wallet in history</button>

      <Line data={data} />
    </div>
  );
};
