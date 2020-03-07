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
          <Link to='/présentation-crypto-wallet'>
            Présentation de l'application Crypto Walllet
          </Link>
        </li>
        <li>
          <Link to='/'>My crypto wallet</Link>
        </li>
      </ul>

      <LoginWithGoogle />
    </nav>
  );
};
