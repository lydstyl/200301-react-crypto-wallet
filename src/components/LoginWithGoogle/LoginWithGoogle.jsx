import React from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';

import { auth } from '../../firebase/firebase';

export const LoginWithGoogle = () => {
  const { loading, isAuthenticated } = useStoreState(state => state.user);

  const signInWithGoogle = useStoreActions(
    actions => actions.user.signInWithGoogle
  );

  const loginHandler = () => {
    signInWithGoogle();
  };

  const logoutHandler = () => {
    auth.signOut();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <button onClick={logoutHandler}>Log out</button>
      ) : (
        <button onClick={loginHandler}>Login with Google</button>
      )}
    </div>
  );
};
