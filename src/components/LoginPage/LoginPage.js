import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

export const LoginPage = () => {
  const { isAuthenticated } = useStoreState(state => state.user);

  const history = useHistory();
  if (isAuthenticated) {
    history.replace({ pathname: '/protected' });
  }

  const signInWithGoogle = useStoreActions(
    actions => actions.user.signInWithGoogle
  );

  return (
    <div>
      <p>You must log in to view the page</p>

      <button onClick={() => signInWithGoogle()}>Login with Google</button>
    </div>
  );
};
