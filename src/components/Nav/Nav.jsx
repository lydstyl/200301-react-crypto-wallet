import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { auth, createUserProfileDocument } from '../../firebase/firebase';
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle';

export const Nav = () => {
  const { falseInitialAssets } = useStoreState(state => state.wallet);

  const { setUserAndCredential, authenticate, signOut } = useStoreActions(
    actions => actions.user
  );
  const { setInitialWallet } = useStoreActions(actions => actions.wallet);

  useEffect(() => {
    auth.onAuthStateChanged(
      async user => {
        if (user) {
          // User is signed in.
          await createUserProfileDocument(user);

          setUserAndCredential({ user });

          authenticate();

          if (falseInitialAssets) {
            // thunk to fetch assets in db
            setInitialWallet(user.uid);
          }
        } else {
          signOut(true);
        }
      },
      error => console.log(error)
    );
  }, [
    setUserAndCredential,
    authenticate,
    setInitialWallet,
    falseInitialAssets,
    signOut
  ]);

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
