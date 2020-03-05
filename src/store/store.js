import { createStore } from 'easy-peasy';

import { walletStore } from './wallet/walletStore';

export const store = createStore({
  user: {},
  wallet: walletStore
});
