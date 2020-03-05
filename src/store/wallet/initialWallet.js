export const initialWallet = {
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
    USD: { balance: 0 },
    BTC: { balance: 2.01554857 + 0.6134607 + 0.4332504 },
    ETH: { balance: 1.54047967 },
    XRP: { balance: 13146.31187222 },
    BCH: { balance: 6.19146287 },
    LTC: { balance: 20.84101816 },
    XLM: { balance: 17378 },
    XMR: { balance: 5.030665 },
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
  ]
};
