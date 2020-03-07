import { initialState } from './initialState';

import { actions } from './actions';
// import { thunks } from './thunks';

export const userStore = {
  ...initialState,

  ...actions

  // ...thunks
};
