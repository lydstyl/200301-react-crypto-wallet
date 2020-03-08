import { action } from 'easy-peasy';

export const actions = {
  setInitialAssets: action((state, payload) => {
    state.assets = payload;
    if (Object.keys(payload).length) {
      state.falseInitialAssets = false;
    }
  }),

  addAsset: action((state, payload) => {
    state.assets[payload.symbol.toUpperCase()] = { balance: payload.balance };
  }),

  removeAsset: action((state, payload) => {
    delete state.assets[payload];
  }),

  setAssets: action((state, payload) => {
    state.assets = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  setSortedAssets: action((state, payload) => {
    const cryptos = Object.keys(payload);
    const sortedAssets = {
      notCounted: [],
      counted: []
    };

    cryptos.forEach(crypto => {
      const { balance, usdPrice } = payload[crypto];

      const randomColor =
        'rgba(' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ', 0.6)';

      if (usdPrice * 0 === 0) {
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

  addTotal: action(state => {
    let total = 0;

    state.sortedAssets.counted.forEach(asset => {
      total += asset.usdValue;
    });

    state.currentTotal = total;
  }),

  addWalletGraphData: action(state => {
    const walletGraphData = {
      labels: [],
      numbers: [],
      backgroundColor: []
    };

    state.sortedAssets.counted.forEach(asset => {
      const { label, usdValue } = asset;
      walletGraphData.labels.push(label);
      walletGraphData.numbers.push(usdValue);
      walletGraphData.backgroundColor.push(asset.randomColor);
    });

    state.walletGraphData = walletGraphData;
  }),

  addToHistory: action((state, { savedAtFr, walletTotal }) => {
    state.history.push({
      date: savedAtFr,
      usdValue: walletTotal
    });
  }),

  setHistoryToStore: action((state, payload) => {
    const history = payload.map(event => ({
      date: event.savedAtFr,
      // date: event.savedAtEn,
      usdValue: event.walletTotal
    }));

    state.history = history;
  })
};
