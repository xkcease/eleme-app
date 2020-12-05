import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        total: 0,
        deliveryPrice: 0,
        minPrice: 0,
        amount: '',
    },
    mutations: {
        updateDeliveryPrice(state, payload) {
            state.deliveryPrice = payload.deliveryPrice;
        },
        updateMinPrice(state, payload) {
            state.minPrice = payload.minPrice;
        }
        // updateTotal(state, payload) {

        // }
    },
    actions: {},
    modules: {}
});
