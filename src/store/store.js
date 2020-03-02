import { createStore, action, thunk } from 'easy-peasy';

export const store = createStore({
  user: {},
  wallet: {
    loading: false,
    currentTotal: 0,
    walletGraphData: {
      // https://www.chartjs.org/docs/latest/charts/doughnut.html
      labels: [10, 20, 40],
      numbers: ['USD', 'BTC', 'ETH'],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
    },
    notCounted: [],
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
    sortedAssets: { counted: [], notCounted: [] },
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
    setLoading: action((state, paylod) => {
      state.loading = paylod;
    }),
    setSortedAssets: action((state, paylod) => {
      const cryptos = Object.keys(paylod);
      const sortedAssets = {
        notCounted: [],
        counted: []
      };

      cryptos.forEach(crypto => {
        const { balance, usdPrice } = paylod[crypto];

        const randomColor =
          'rgba(' +
          Math.floor(Math.random() * 256) +
          ',' +
          Math.floor(Math.random() * 256) +
          ',' +
          Math.floor(Math.random() * 256) +
          ', 0.6)';

        if (usdPrice * 0 == 0) {
          sortedAssets.counted.push({
            label: crypto,
            balance,
            usdPrice,
            usdValue: balance * usdPrice,
            randomColor
          });
        } else {
          sortedAssets.notCounted.push({
            label: crypto,
            balance,
            randomColor
          });
        }
      });

      sortedAssets.counted.sort((a, b) => {
        if (a.usdValue > b.usdValue) {
          return -1;
        }
        if (b.usdValue > a.usdValue) {
          return 1;
        }
        return 0;
      });

      state.sortedAssets = sortedAssets;
    }),
    addTotal: action((state, paylod) => {
      let total = 0;

      state.sortedAssets.counted.forEach(asset => {
        total += asset.usdValue;
      });

      state.currentTotal = total;
    }),
    addWalletGraphData: action((state, paylod) => {
      const walletGraphData = {
        labels: [],
        numbers: [],
        backgroundColor: []
      };

      state.sortedAssets.counted.map(asset => {
        const { label, usdValue } = asset;
        walletGraphData.labels.push(label);
        walletGraphData.numbers.push(usdValue);
        walletGraphData.backgroundColor.push(asset.randomColor);
      });

      state.walletGraphData = walletGraphData;
    }),

    // thunks
    deleteAsset: thunk(async (actions, payload) => {
      delete payload.assets[payload.cryptoToRemove];

      actions.updateAssetsWithPrices(payload.assets);
    }),
    addOneAsset: thunk(async (actions, payload) => {
      actions.addAsset(payload.toAdd);

      payload.assets[payload.toAdd.symbol.toUpperCase()] = {
        balance: payload.toAdd.balance
      };

      actions.updateAssetsWithPrices(payload.assets);
    }),
    updateAssetsWithPrices: thunk(async (actions, payload) => {
      actions.setLoading(true);

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

      actions.setSortedAssets(newAssets);

      actions.addTotal();

      actions.addWalletGraphData();

      // actions.addCountedAndNot

      //actions.addPercent();

      actions.setLoading(false);
    })
  }
});
