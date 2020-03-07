import React from 'react';

import { useStoreState } from 'easy-peasy';

import { auth } from '../../firebase/firebase';

export const LoginWithGoogle = () => {
  const { loading, isAuthenticated, userAndCredential } = useStoreState(
    state => state.user
  );

  const logoutHandler = () => {
    auth.signOut();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <>
          <img src={userAndCredential.user.photoURL} alt='me' />
          <button onClick={logoutHandler}>Log out</button>
        </>
      ) : (
        <p>Not loged</p>
      )}
    </div>
  );
};
