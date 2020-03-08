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
      history.replace({ pathname: '/' });
    }
  }, [history, isAuthenticated]);

  return (
    <div className='cpl'>
      {!loading && (
        <>
          <p>Vous devez vous loger pour voir cette page.</p>

          <button onClick={() => signInWithGoogle()}>
            Se loguer via Google
          </button>
        </>
      )}
    </div>
  );
};
