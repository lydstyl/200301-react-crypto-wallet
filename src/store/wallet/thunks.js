import { thunk } from 'easy-peasy'
import { firestore } from '../../firebase/firebase'

export const thunks = {
  setInitialWallet: thunk(async (actions, payload) => {
    const initialAssets = {}

    firestore
      .collection(`users/${payload}/assets`)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(queryDocumentSnapshot => {
          const T = queryDocumentSnapshot.data()

          initialAssets[T.symbol] = { balance: T.balance }
        })

        actions.getHistoryFromDB(payload)

        actions.setInitialAssets(initialAssets)

        actions.updateAssetsWithPrices(initialAssets)
      })
  }),

  addOneAsset: thunk(async (actions, payload) => {
    // add asset in the user in the db
    firestore
      .collection(`users/${payload.user.uid}/assets`)
      .add({
        ...payload.toAdd, // contain symbol and balance
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)

        actions.addAsset(payload.toAdd)

        payload.assets[payload.toAdd.symbol.toUpperCase()] = {
          balance: payload.toAdd.balance,
        }

        actions.updateAssetsWithPrices(payload.assets)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }),

  deleteAsset: thunk(async (actions, payload) => {
    firestore
      .collection(`users/${payload.uid}/assets`)
      .where('symbol', '==', payload.cryptoToRemove)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          firestore
            .collection(`users/${payload.uid}/assets`)
            .doc(doc.id)
            .delete()
            .then(function () {
              console.log('Document successfully deleted!')

              delete payload.assets[payload.cryptoToRemove]

              actions.updateAssetsWithPrices(payload.assets)
            })
            .catch(function (error) {
              console.error('Error removing document: ', error)
            })
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  }),

  updateAssetsWithPrices: thunk(async (actions, payload) => {
    actions.setLoading(true)

    let response = await fetch(`https://api.coincap.io/v2/assets/bitcoin`)
    let datas = await response.json()

    const btcPriceUsd = datas.data.priceUsd
    actions.setBtcPriceUsd(btcPriceUsd)

    // console.log('datas.data.priceEur', datas.data.priceEur)
    // console.log('datas.data', datas.data)
    // actions.setBtcPriceUsd(datas.data.priceEur)

    response = await fetch(`https://api.coincap.io/v2/assets`)
    datas = await response.json()

    const availableAPISymbols = datas.data.map(crypto => crypto.symbol)

    const cryptos = Object.keys(payload)

    const newAssets = {}
    cryptos.forEach(crypto => {
      newAssets[crypto] = payload[crypto]
      if (!availableAPISymbols.includes(crypto)) {
        if (crypto === 'USD') {
          newAssets[crypto].usdPrice = 1
        } else {
          newAssets[crypto].usdPrice = 'non compté'
        }
      }
    })

    datas.data.forEach(crypto => {
      const btcPrice = parseFloat(crypto.priceUsd / btcPriceUsd)
      if (cryptos.includes(crypto.symbol)) {
        newAssets[crypto.symbol].usdPrice = parseFloat(crypto.priceUsd)
        newAssets[crypto.symbol].btcPrice = btcPrice
        newAssets[crypto.symbol].btcValue =
          btcPrice * newAssets[crypto.symbol].balance
      }
    })

    actions.setAssets(newAssets) // 👈 dispatch local actions to update state

    actions.setSortedAssets(newAssets)

    actions.addTotal()

    actions.addWalletGraphData()

    actions.setLoading(false)
  }),

  setEurPrice: thunk(async (action, payload) => {
    try {
      let response = await fetch(`https://api.exchangeratesapi.io/latest`)
      let datas = await response.json()
      console.log('datas', datas)
    } catch (error) {
      console.log('setEurPrice error', error)
    }
  }),

  saveToHistoryDB: thunk(async (actions, payload) => {
    firestore
      .collection(`users/${payload.uid}/history`)
      .add(payload)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)

        actions.addToHistory(payload)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }),

  removeFromHistoryDB: thunk(async (actions, payload) => {
    firestore
      .collection(`users/${payload.uid}/history`)
      .doc(payload.eventId)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!')

        actions.removeFromHistory(payload.eventId)
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)
      })
  }),

  getHistoryFromDB: thunk(async (actions, payload) => {
    const history = []

    firestore
      .collection(`users/${payload}/history`)
      .orderBy('savedAtEn') // sort with the date can put 'desc' in second parameter if needed
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(queryDocumentSnapshot => {
          const T = queryDocumentSnapshot.data()

          T.eventId = queryDocumentSnapshot.id

          history.push(T)
        })

        actions.setHistoryToStore(history)
      })
  }),
}
