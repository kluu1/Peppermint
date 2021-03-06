import axios from 'axios';
import moment from 'moment';
import {
  getTopSellingItemsByPriceQuery,
  getTopSellingItemsByQuantityQuery,
  getTopPerformingStoresQuery,
  getYearlyPerformance,
  getGoalsData,
} from './query';

const defaultHeaders = () => ({
  url: '/graphql',
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export default {
  // GraphQL query for top selling items by price
  getTopSellingItemsByPrice: () => axios({
    ...defaultHeaders(),
    data: { query: getTopSellingItemsByPriceQuery },
  })
    .then((response) => {
      const items = response.data.data.topSellingItems;
      const formatedData = [];
      for (let i = 0; i < items.length && i < 4; i += 1) {
        const item = {};
        item.id = i;
        item.name = items[i]._id;
        item.value = items[i].totalPrice.toFixed(2);
        item.value = formatter.format(item.value);
        formatedData.push(item);
      }
      return formatedData;
    })
    .catch((error) => { throw error; }),

  // GraphQL query for top selling items by quantity
  getTopSellingItemsByQuantity: () => axios({
    ...defaultHeaders(),
    data: { query: getTopSellingItemsByQuantityQuery },
  })
    .then((response) => {
      const items = response.data.data.topSellingItems;
      const formatedData = [];
      for (let i = 0; i < items.length && i < 4; i += 1) {
        const item = {};
        item.id = i;
        item.name = items[i]._id;
        item.value = items[i].totalQuantity;
        formatedData.push(item);
      }
      return formatedData;
    })
    .catch((error) => { throw error; }),

  // GraphQL query for top performing stores
  getTopPerformingStores: () => axios({
    ...defaultHeaders(),
    data: { query: getTopPerformingStoresQuery },
  })
    .then((response) => {
      const stores = response.data.data.topPerformingStores;
      const formatedData = [];
      for (let i = 0; i < stores.length && i < 4; i += 1) {
        const store = {};
        store.id = i;
        store.name = stores[i]._id;
        store.value = stores[i].totalAmount.toFixed(2);
        store.value = formatter.format(store.value);
        formatedData.push(store);
      }
      return formatedData;
    })
    .catch((error) => { throw error; }),
  // GraphQL query for Sales Distribution by Store
  getSalesDistributionByStore: () => axios({
    ...defaultHeaders(),
    data: { query: getTopPerformingStoresQuery },
  })
    .then((response) => {
      const stores = response.data.data.topPerformingStores;
      const formatedData = {
        labels: [],
        series: [],
      };
      for (let i = 0; i < stores.length; i += 1) {
        formatedData.labels.push(stores[i]._id);
        formatedData.series.push(stores[i].totalAmount);
      }
      return formatedData;
    })
    .catch((error) => { throw error; }),
  // QrephQL query for Yearly Performance data
  getYearlyPerformance: () => axios({
    ...defaultHeaders(),
    data: { query: getYearlyPerformance },
  }).then((response) => {
    const yearlyData = response.data.data.performancebyDates;
    const { year } = yearlyData[0].date;
    const formatted = {
      xaxis: {
        categories: [],
      },
      lineSeries: [
        {
          name: '',
          data: [],
        },
      ],
    };
    yearlyData.forEach((item) => {
      const { month } = item.date;
      const monthStr = moment()
        .month(month - 1)
        .format('MMM');
      formatted.xaxis.categories.push(monthStr);
      formatted.lineSeries[0].data.push(item.total);
    });
    formatted.lineSeries[0].name = year;
    return formatted;
  }),
  // GraphQL query for Company Goals Data
  getGoalsData: () => axios({
    ...defaultHeaders(),
    data: { query: getGoalsData },
  }).then((response) => {
    const goalsData = response.data.data.getCompanyGoalsData;

    const formattedData = {
      month: [],
      year: goalsData.year,
      goal: goalsData.goal,
      actual: goalsData.actual,
    };

    goalsData.month.forEach((item) => {
      const monthStr = moment()
        .month(item - 1)
        .format('MMM');
      formattedData.month.push(monthStr);
    });

    return formattedData;
  }),
};
