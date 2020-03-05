import { action, thunk } from 'easy-peasy';
import { initialWallet } from './initialWallet';

export const walletStore = {
  ...initialWallet,

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

    state.sortedAssets.counted.forEach(asset => {
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
};
