import { action } from 'easy-peasy';

export const actions = {
  setInitialAssets: action((state, payload) => {
    state.assets = payload;
    if (Object.keys(payload).length) {
      state.falseInitialAssets = false;
    }
  }),

  setBtcPriceUsd: action((state, payload) => {
    state.btcPriceUsd = payload;
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
      counted: [],
    };

    cryptos.forEach((crypto) => {
      const { balance, usdPrice, btcValue } = payload[crypto];

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
          btcValue,
          randomColor,
        });
      } else {
        sortedAssets.notCounted.push({
          label: crypto,
          balance,
          randomColor,
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

  addTotal: action((state) => {
    let total = 0;

    state.sortedAssets.counted.forEach((asset) => {
      total += asset.usdValue;
    });

    state.currentTotal = total; // total in usd
    state.currentBTCTotal = total / state.btcPriceUsd; // total in btc
  }),

  addWalletGraphData: action((state) => {
    const walletGraphData = {
      labels: [],
      numbers: [],
      backgroundColor: [],
    };

    state.sortedAssets.counted.forEach((asset) => {
      const { label, usdValue } = asset;
      walletGraphData.labels.push(label);
      walletGraphData.numbers.push(usdValue);
      walletGraphData.backgroundColor.push(asset.randomColor);
    });

    state.walletGraphData = walletGraphData;
  }),

  addToHistory: action(
    (state, { savedAtEn, savedAtFr, walletTotal, walletBtcTotal }) => {
      state.history.push({
        key: savedAtEn,
        date: savedAtFr,
        usdValue: walletTotal,
        btcValue: walletBtcTotal,
      });
    }
  ),

  removeFromHistory: action((state, payload) => {
    state.history = state.history.filter((event) => event.eventId !== payload);
  }),

  setHistoryToStore: action((state, payload) => {
    const history = payload.map((event) => ({
      eventId: event.eventId,
      key: event.savedAtEn,
      date: event.savedAtFr,
      usdValue: event.walletTotal,
      btcValue: event.walletBtcTotal,
    }));

    state.history = history;
  }),
};
