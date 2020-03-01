import React from 'react';
import { Line } from 'react-chartjs-2';

export const HistoryGraph = () => {
  const data = {
    datasets: [
      {
        data: [
          {
            x: 0,
            y: 5
          },
          {
            x: 10,
            y: 8
          },
          {
            x: 12,
            y: 20
          }
        ]
      }
    ],

    labels: ['DATE1', 'DATE2', 'DATE3']
  };

  return (
    <div className='history'>
      <Line data={data} />
    </div>
  );
};
