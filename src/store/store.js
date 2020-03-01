import { createStore, action, thunk } from 'easy-peasy';

export const store = createStore({
  user: {},
  wallet: {
    currentTotal: 0,
    assets: {
      USD: { balance: 632 },
      BTC: { balance: 3.06225967 },
      XRP: { balance: 10491.17282557 },
      BCH: { balance: 5.13250079 },
      LTC: { balance: 9.31198211 },
      XLM: { balance: 5390.23728831 },
      IOTA: { balance: 245.035 },
      NEO: { balance: 0.9 },
      NXT: { balance: 33935 },
      SPND: { balance: 20391 },
      GNT: { balance: 9840 },
      STEEM: { balance: 5981 },
      STRAT: { balance: 610 },
      BTT: { balance: 500 },
      MAID: { balance: 0.09920723 }
    },
    history: [
      { date: 'date1', usdValue: 5 },
      { date: 'date2', usdValue: 8 },
      { date: 'date3', usdValue: 20 }
    ],

    // actions
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

    // thunks
    updateAssetsWithPrices: thunk(async (actions, payload) => {
      let response = await fetch(`https://api.coincap.io/v2/assets`);
      let datas = await response.json();

      const availableAPISymbols = datas.data.map(crypto => crypto.symbol);

      const cryptos = Object.keys(payload);

      const newAssets = {};
      cryptos.forEach(crypto => {
        newAssets[crypto] = payload[crypto];
        if (!availableAPISymbols.includes(crypto)) {
          newAssets[crypto].usdPrice = 'non compté';
        }
      });

      datas.data.forEach(crypto => {
        if (cryptos.includes(crypto.symbol)) {
          newAssets[crypto.symbol].usdPrice = parseFloat(crypto.priceUsd);
        }
      });

      actions.setAssets(newAssets); // 👈 dispatch local actions to update state
    })
  }
});
