import { createStore } from 'easy-peasy';
import { action } from 'easy-peasy';

import { walletStore } from './wallet/walletStore';

export const store = createStore({
  user: {
    loading: false,
    isAuthenticated: false,
    authenticate: action((state, payload) => {
      state.isAuthenticated = true;
    })
  },

  wallet: walletStore
});
