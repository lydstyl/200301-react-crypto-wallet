import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Nav } from './components/Nav/Nav';

import { PublicPage } from './components/PublicPage/PublicPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { AddAsset } from './components/AddAsset/AddAsset';
import { Assets } from './components/Assets/Assets';
import { WalletGraph } from './components/WalletGraph/WalletGraph';
import { HistoryGraph } from './components/HistoryGraph/HistoryGraph';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <div className='wrapper'>
          <Switch>
            <div className='assets-and-graph'>
              <Route path='/présentation-crypto-wallet'>
                <PublicPage />
              </Route>

              <Route path='/login'>
                <LoginPage />
              </Route>
            </div>

            <PrivateRoute path='/'>
              <div className='assets-and-graph'>
                <AddAsset />

                <Assets />

                <WalletGraph />
              </div>

              <div className='history-and-graph'>
                <HistoryGraph />
              </div>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
