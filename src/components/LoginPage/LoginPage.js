import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

export const LoginPage = () => {
  const authenticate = useStoreActions(actions => actions.user.authenticate);

  const history = useHistory();

  let login = () => {
    authenticate(() => {
      history.replace({ pathname: '/login' });
    });
  };

  return (
    <div>
      <p>You must log in to view the page</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};
