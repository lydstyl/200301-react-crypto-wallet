import { createStore, action } from 'easy-peasy';

export const store = createStore({
  assets: {
    BTC: { balance: 2.17554857 },
    ETH: { balance: 0 },
    XRP: { balance: 10491.17282557 },
    BCH: { balance: 5.13250079 },
    LTC: { balance: 9.31198211 }
  },
  add: action((state, payload) => {
    state.items.push(payload);
  })
});
