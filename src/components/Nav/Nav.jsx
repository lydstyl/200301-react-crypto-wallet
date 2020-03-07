import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import { auth } from '../../firebase/firebase';
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle';

export const Nav = () => {
  const { setUserAndCredential, authenticate, signOut } = useStoreActions(
    actions => actions.user
  );

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        setUserAndCredential({ user });

        authenticate();
      } else {
        signOut(true);
      }
    });
  }, [setUserAndCredential, authenticate, signOut]);

  return (
    <nav>
      <ul>
        <li>
          <Link to='/public'>Public Page</Link>
        </li>
        <li>
          <Link to='/protected'>Protected Page</Link>
        </li>
      </ul>

      <LoginWithGoogle />
    </nav>
  );
};
