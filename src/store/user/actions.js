import { action } from 'easy-peasy';

export const actions = {
  authenticate: action((state, payload) => {
    state.isAuthenticated = true;
  }),

  signout: action((state, payload) => {
    state.isAuthenticated = false;
  })
};
