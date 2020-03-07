import { thunk } from 'easy-peasy';

import Firebase from '../../firebase/firebase';

console.log('f');

const f = new Firebase();

//f.auth.createUserWithEmailAndPassword('lydstyl@gmail.com', '123456');

export const thunks = {
  createUserWithEmailAndPassword: thunk(async (actions, payload) => {
    f.auth.createUserWithEmailAndPassword('lydstyl@gmail.com', '123456');

    //actions.updateAssetsWithPrices(payload.assets);
  })
};
