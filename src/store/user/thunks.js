import { thunk } from 'easy-peasy';

import { signInWithGoogle } from '../../firebase/firebase';

export const thunks = {
  // createUserWithEmailAndPassword: thunk(async (actions, payload) => {
  //   actions.setLoading(true);

  //   actions.setLoading(false);
  // }),

  signInWithGoogle: thunk(async (actions, payload) => {
    actions.setLoading(true);

    const result = await signInWithGoogle();

    actions.setUserAndCredential(result);

    actions.authenticate();

    actions.setLoading(false);
  }),

  // saveUserInDBIfNotYetSaved: thunk(async (actions, payload) => {
  //   console.log('saveUserInDBIfNotYetSaved', payload);
  // }),

  signOut: thunk(async (actions, payload) => {
    actions.setLoading(true);

    // const result = await signOut();
    actions.setUserAndCredential(null);

    actions.signout();

    actions.setLoading(false);
  })
};
