import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

export const LoginPage = () => {
  const { loading, isAuthenticated } = useStoreState(state => state.user);

  const signInWithGoogle = useStoreActions(
    actions => actions.user.signInWithGoogle
  );

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace({ pathname: '/protected' });
    }
  }, [history, isAuthenticated]);

  return (
    <div>
      {!loading && (
        <>
          <p>You must log in to view the page</p>

          <button onClick={() => signInWithGoogle()}>Login with Google</button>
        </>
      )}
    </div>
  );
};
