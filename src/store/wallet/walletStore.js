import { initialWallet } from './initialWallet';

import { actions } from './actions';
import { thunks } from './thunks';

export const walletStore = {
  ...initialWallet,

  ...actions,

  ...thunks,
};
