import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        total: 0,
        deliveryPrice: 0,
        minPrice: 0,
        amount: '',
        seller: {},
    },
    mutations: {
        updateDeliveryPrice(state, payload) {
            state.deliveryPrice = payload.deliveryPrice;
        },
        updateMinPrice(state, payload) {
            state.minPrice = payload.minPrice;
        },
        updateSeller(state, payload) {
            state.seller = payload.seller;
        },
        // updateTotal(state, payload) {

        // }
    },
});
