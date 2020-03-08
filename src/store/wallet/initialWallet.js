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
  falseInitialAssets: true,
  assets: null,

  sortedAssets: { counted: [], notCounted: [] },
  history: [
    { date: 'date1', usdValue: 5 },
    { date: 'date2', usdValue: 8 },
    { date: 'date3', usdValue: 20 }
  ]
};
