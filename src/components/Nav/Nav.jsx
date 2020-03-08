import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import { auth, createUserProfileDocument } from '../../firebase/firebase';
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle';

export const Nav = () => {
  const { setUserAndCredential, authenticate, signOut } = useStoreActions(
    actions => actions.user
  );

  useEffect(() => {
    auth.onAuthStateChanged(
      async user => {
        if (user) {
          // User is signed in.
          await createUserProfileDocument(user);

          setUserAndCredential({ user });

          authenticate();
        } else {
          signOut(true);
        }
      },
      error => console.log(error)
    );
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
