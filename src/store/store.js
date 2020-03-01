import { createStore, action, thunk } from 'easy-peasy';

const addPriceToAsset = assets => {
  console.log('3 xxx', assets);

  let totalUsdValue = 0;

  fetch('https://api.coincap.io/v2/assets')
    .then(response => {
      return response.json();
    })
    .then(datas => {
      // datas = datas.data.filter(crypto =>
      //   Object.keys(assets).includes(crypto.symbol)
      // );

      const newAssets = {};
      const cryptos = Object.keys(assets);

      cryptos.forEach(crypto => {
        newAssets[crypto] = {
          balance: assets[crypto].balance,
          usdPrice: 'non compté'
        };
      });

      // assets = assets.map(asset => ({ ...asset, price: 'non compté' }));

      // console.log(assets);

      // datas = datas.data.filter;

      // console.log('4', datas.data[0]); // 9 of 15 crypto in the wallet ... TODO : display 'not counted in front of the ones not counted

      // // const assets = useStoreState(state => state.wallet.assets);
      // console.log('5 aaaa', assets);

      // Object.keys(assets).forEach(crypto => {
      //   // assets[crypto].price
      });

      // return datas;

      // // the one counted in the chart :
      // //setDatas(datas);

      // datas.forEach(asset => {
      //   const symbol = asset.symbol;
      //   const priceUsd = parseFloat(asset.priceUsd);
      //   const balance = assets[asset.symbol].balance;
      //   const usdValue = priceUsd * balance;
      //   totalUsdValue += usdValue;
      //   assets[symbol].price = priceUsd;
      //   assets[symbol].usdValue = usdValue;
      // });

      // console.log(assets);

      // const usdVals = [];

      // Object.keys(assets).forEach(asset => {
      //   assets[asset].percent = assets[asset].usdValue / totalUsdValue;

      //   usdVals.push(assets[asset].usdValue);
      // });

      // setCurrentTotal(totalUsdValue); // totalUsdValue to the store

      // // setLabels(Object.keys(assets));

      // // setUsdValues(usdVals);

      // setAssets(assets);
      // ///////////////////////////////////////
      // // descending order
      // const labelsAndVals = [];

      // Object.keys(assets).forEach(asset => {
      //   labelsAndVals.push({
      //     label: asset,
      //     usdValue: assets[asset].usdValue
      //   });
      // });

      // labelsAndVals.sort(function(a, b) {
      //   if (a.usdValue > b.usdValue || a.usdValue === undefined) {
      //     return -1;
      //   }
      //   if (b.usdValue > a.usdValue) {
      //     return 1;
      //   }
      //   return 0;
      // });

      // const labels2 = [];
      // const usdVals2 = [];
      // labelsAndVals.forEach(asset => {
      //   if (asset.usdValue === undefined) {
      //     return;
      //   }

      //   labels2.push(asset.label);
      //   labels2.usdVals2(asset.usdValue);
      // });

      // // setLabels(labels2);
      // // setUsdValues(usdVals2);

      // // {
      // //   datasets: [
      // //     {
      // //       // data: [10, 20, 30]
      // //       data: usdValues
      // //     }
      // //   ],

      // //   // These labels appear in the legend and in the tooltips when hovering different arcs
      // //   // labels: ['USD', 'BTC', 'ETH']
      // //   labels: labels
      // // }

      // console.log(1);
      // setData({ ...data, datasets: [{ data: usdVals2 }], labels: labels2 });

      // console.log(2);
      // console.log(data);
      // console.log(labelsAndVals);
    })
    .catch(err => {
      console.log(err);
    });
};

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
    updateAssetsWithPrices: thunk(async (state, payload) => {
      console.log('2 payload', payload);

      const updated = await addPriceToAsset(payload);
      // actions.setProduct(updated); // 👈 dispatch local actions to update state
    })
  }
});
