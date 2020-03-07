import { action } from 'easy-peasy';

export const actions = {
  authenticate: action(state => {
    state.isAuthenticated = true;
  }),

  signout: action(state => {
    state.isAuthenticated = false;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  setUserAndCredential: action((state, payload) => {
    if (payload) {
      state.userAndCredential = payload;
      state.uid = payload.user.uid;
      state.email = payload.user.email;
      // state.accessToken = payload.credential.accessToken;
    } else {
      state.userAndCredential = null;
      state.uid = null;
      state.email = null;
      // state.accessToken = null;
    }
  })
};
