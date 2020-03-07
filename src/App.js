import React from 'react';

// import Firebase from './firebase/firebase';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthButton } from './components/AuthButton/AuthButton';
import { Nav } from './components/Nav/Nav';

import { Test } from './components/Test/Test';

import { PublicPage } from './components/PublicPage/PublicPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ProtectedPage } from './components/ProtectedPage/ProtectedPage';
import { AddAsset } from './components/AddAsset/AddAsset';
import { Assets } from './components/Assets/Assets';
import { WalletGraph } from './components/WalletGraph/WalletGraph';
// import { HistoryGraph } from './components/HistoryGraph/HistoryGraph';

import './App.css';

function App() {
  //const f = new Firebase();

  //f.auth.createUserWithEmailAndPassword('lydstyl@gmail.com', '123456');

  return (
    <div className='App'>
      <Router>
        <AuthButton />

        <Nav />

        <Switch>
          <Route path='/test'>
            <Test />
          </Route>
          <Route path='/public'>
            <PublicPage />
          </Route>

          <Route path='/login'>
            <LoginPage />
          </Route>

          <PrivateRoute path='/protected'>
            <ProtectedPage />

            <AddAsset />

            <Assets />

            <WalletGraph />
            {/* <HistoryGraph /> */}
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
