import { thunk } from 'easy-peasy';

export const thunks = {
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
