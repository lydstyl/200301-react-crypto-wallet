import { createStore, action } from 'easy-peasy';

export const store = createStore({
  user: {},
  wallet: {
    currentTotal: 0,
    assets: {
      BTC: { balance: 2.17554857 },
      XRP: { balance: 10491.17282557 },
      BCH: { balance: 5.13250079 },
      LTC: { balance: 9.31198211 }
    },
    addAsset: action((state, payload) => {
      state.assets[payload.symbol.toUpperCase()] = { balance: payload.balance };
    }),
    removeAsset: action((state, payload) => {
      delete state.assets[payload];
    }),
    setAssets: action((state, payload) => {
      state.assets = payload;
    }),
    setCurrentTotal: action((state, paylod) => {
      state.currentTotal = paylod;
    }),
    history: [
      { date: 'date1', usdValue: 5 },
      { date: 'date2', usdValue: 8 },
      { date: 'date3', usdValue: 20 }
    ]
  }
});
