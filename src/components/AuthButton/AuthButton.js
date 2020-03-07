import React from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreState, useStoreActions } from 'easy-peasy';

export const AuthButton = () => {
  const isAuthenticated = useStoreState(state => state.user.isAuthenticated);

  const signout = useStoreActions(actions => actions.user.signout);

  let history = useHistory();

  return isAuthenticated ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};
