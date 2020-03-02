import React from 'react';

import { AddAsset } from './components/AddAsset/AddAsset';
import { Assets } from './components/Assets/Assets';
import { WalletGraph } from './components/WalletGraph/WalletGraph';
import { HistoryGraph } from './components/HistoryGraph/HistoryGraph';

import './App.css';

function App() {
  return (
    <div className='App'>
      <AddAsset />
      <Assets />
      <WalletGraph />
      {/* <HistoryGraph /> */}
    </div>
  );
}

export default App;
