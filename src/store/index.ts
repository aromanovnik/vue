import Vue from 'vue';
import Vuex from 'vuex';

import { IPayment } from '@/interfaces/payment';

Vue.use(Vuex);

export const localDB: {
  [key: string]: IPayment[];
} = {
  page1: [
    {
      id: 1, date: '20.03.2020', category: 'Food', value: 169,
    },
    {
      id: 2, date: '21.03.2020', category: 'Navigation', value: 50,
    },
    {
      id: 3, date: '22.03.2020', category: 'Sport', value: 450,
    },
  ],
  page2: [
    {
      id: 4, date: '23.03.2020', category: 'Entertaiment', value: 969,
    },
    {
      id: 5, date: '24.03.2020', category: 'Education', value: 1500,
    },
    {
      id: 6, date: '25.03.2020', category: 'Food', value: 200,
    },
  ],
  page3: [
    {
      id: 7, date: '23.03.2020', category: 'Entertaiment', value: 969,
    },
    {
      id: 8, date: '24.03.2020', category: 'Education', value: 1500,
    },
    {
      id: 9, date: '25.03.2020', category: 'Food', value: 200,
    },
  ],
  page4: [
    {
      id: 10, date: '23.03.2020', category: 'Entertaiment', value: 969,
    },
    {
      id: 11, date: '24.03.2020', category: 'Education', value: 1500,
    },
    {
      id: 12, date: '25.03.2020', category: 'Food', value: 200,
    },
  ],
};

export default new Vuex.Store({
  state: {
    paymentsList: [],
    paymentsListIDS: [],
    categoryList: [],
  },
  mutations: {
    setPaymentListData(state, payload) {
      state.paymentsList = payload;
    },
    // addPaymentListData(state, payload) {
    //   state.paymentsList.push(payload);
    // },
    addPaymentListData(state, payload: any[]) {
      const newUniqObj = payload.filter((obj) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line implicit-arrow-linebreak
        state.paymentsListIDS.indexOf(obj.id) < 0);
      const uniqIDS = newUniqObj.map((obj) => obj.id);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.paymentsListIDS.push(...uniqIDS);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.paymentsList.push(...newUniqObj);
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    // editPaymentListData (state, payload){
    //   Vue.set(state.paymentsList, 0, payload)
    //   state.paymentList[0] = payload
    //   state.paymentList = [...state.paymentList]
    // }
  },
  actions: {
    // fetchData({dispatch}) {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       const items = [];
    //       for (let i = 1; i < 101; i++) {
    //         items.push({
    //           id: i,
    //           date: "28.03.2020",
    //           category: "Food",
    //           value: i
    //         });
    //       }
    //       resolve(items)
    //     }, 2000);
    //   }).then(res => {
    //     dispatch("upgradeData", res);
    //   });
    // },
    fetchData({ commit }, page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = localDB[`page${page}`];
          resolve(items);
        }, 1000);
      }).then((res) => {
        commit('addPaymentListData', res);
      });
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = ['Sport', 'Food', 'Education', 'Internet'];
          resolve(items);
        }, 500);
      }).then((res) => {
        commit('setCategoryList', res);
      });
    },
    upgradeData({ commit, dispatch }, payload) {
      // updateData
      dispatch('fetchCategoryList');
      commit('setPaymentListData', payload);
    },
  },
  getters: {
    getPaymentsList: (state) => state.paymentsList,
    getCategoryList: (state) => state.categoryList,
    getFullPaymentValue: (state) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      state.paymentsList.reduce((res, cur: any) => res + cur.value, 0),

  },
});
