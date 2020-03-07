import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import { Nav } from './components/Nav/Nav';
import { PublicPage } from './components/PublicPage/PublicPage';
import { ProtectedPage } from './components/ProtectedPage/ProtectedPage';

import { AddAsset } from './components/AddAsset/AddAsset';
import { Assets } from './components/Assets/Assets';
import { WalletGraph } from './components/WalletGraph/WalletGraph';
// import { HistoryGraph } from './components/HistoryGraph/HistoryGraph';

import { LoginPage } from './components/LoginPage/LoginPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthButton />

        <Nav />

        <Switch>
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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

export default App;
