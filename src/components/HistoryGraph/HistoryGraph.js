import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Line } from 'react-chartjs-2';

export const HistoryGraph = () => {
  const { uid } = useStoreState(state => state.user);
  const { currentTotal, history } = useStoreState(state => state.wallet);
  const { saveToHistoryDB, removeFromHistoryDB } = useStoreActions(
    state => state.wallet
  );

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

  const handleSaveToHistory = () => {
    const now = new Date();

    const payload = {
      uid,
      savedAtEn: Date.parse(now),
      savedAtFr: now.toLocaleDateString('fr-FR'),
      walletTotal: parseInt(currentTotal)
    };

    saveToHistoryDB(payload);
  };

  const handleRemoveFromHistory = event => {
    const eventId = event.target.parentNode.dataset.eventid;

    removeFromHistoryDB({
      uid,
      eventId
    });
  };

  return (
    <div className='history'>
      <h2>History</h2>
      <button onClick={handleSaveToHistory}>
        Sauver le portefeuille dans l'historique
      </button>

      <Line data={data} />

      <ul>
        {history &&
          history.map(event => (
            <li key={event.key} data-eventid={event.eventId}>
              <span onClick={event => handleRemoveFromHistory(event)}>X</span>
              <span> </span>
              <span>{event.date}</span>
              <span> </span>
              <span>{event.usdValue}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
