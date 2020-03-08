import { thunk } from 'easy-peasy';
import { firestore } from '../../firebase/firebase';

export const thunks = {
  setInitialWallet: thunk(async (actions, payload) => {
    // const initialAssets = {
    //   USD: { balance: 0 },
    //   BTC: { balance: 1 }
    // };
    const initialAssets = {};

    const assets = firestore.collection(`users/${payload}/assets`);

    assets.get().then(querySnapshot => {
      querySnapshot.docs.forEach(queryDocumentSnapshot => {
        const T = queryDocumentSnapshot.data();

        initialAssets[T.symbol] = { balance: T.balance };
      });

      actions.setInitialAssets(initialAssets);

      actions.updateAssetsWithPrices(initialAssets);
    });
  }),

  addOneAsset: thunk(async (actions, payload) => {
    // add asset in the user in the db
    firestore
      .collection(`users/${payload.user.uid}/assets`)
      .add({
        ...payload.toAdd // contain symbol and balance
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

    // actions.addAsset(payload.toAdd);

    // payload.assets[payload.toAdd.symbol.toUpperCase()] = {
    //   balance: payload.toAdd.balance
    // };

    // actions.updateAssetsWithPrices(payload.assets);
  }),

  deleteAsset: thunk(async (actions, payload) => {
    firestore
      .collection(`users/${payload.uid}/assets`)
      .where('symbol', '==', payload.cryptoToRemove)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());

          firestore
            .collection(`users/${payload.uid}/assets`)
            .doc(doc.id)
            .delete()
            .then(function() {
              console.log('Document successfully deleted!');
            })
            .catch(function(error) {
              console.error('Error removing document: ', error);
            });
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });

    // delete payload.assets[payload.cryptoToRemove];

    // actions.updateAssetsWithPrices(payload.assets);
  }),

  saveAssetsToFirebase: thunk(async (actions, payload) => {
    console.log('saveAssetsToFirebase');
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

    // à quelle moment sauver les assets dans firebase ?
    console.log('newAssets', newAssets);

    actions.addTotal();

    actions.addWalletGraphData();

    // actions.addCountedAndNot

    //actions.addPercent();

    actions.setLoading(false);
  }),

  set1BTC: thunk(async (actions, payload) => {
    console.log('thunk set1BTC', payload);

    //state.assets[payload.symbol.toUpperCase()] = { balance: payload.balance };
    actions.addAsset({ symbol: 'btc', balance: 1 });

    // delete payload.assets[payload.cryptoToRemove];

    // actions.updateAssetsWithPrices(payload.assets);
  })
};
