import { createStore } from 'easy-peasy';

import { userStore } from './user/userStore';
import { walletStore } from './wallet/walletStore';

export const store = createStore({
  user: userStore,

  wallet: walletStore
});
