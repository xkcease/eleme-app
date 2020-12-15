import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        deliveryPrice: 0,
        minPrice: 0,
        seller: {},
        cart: [],
        goods: [],
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
        updateGoods(state, payload) {
            state.goods = payload.goods;
        },
        insertFood(state, payload) {
            for (let item of state.cart) {
                if (item.name === payload.name) {
                    item.count++;

                    return;
                }
            }

            state.cart.push({ ...payload, count: 1 });
        },
        deleteFood(state, payload) {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].name === payload.name) {
                    state.cart[i].count > 1
                        ? state.cart[i].count--
                        : state.cart.splice(i, 1);

                    return;
                }
            }
        },
        clearCart(state) {
            state.cart = [];
        },
    },
    getters: {
        total(state) {
            let sum = 0;

            if (state.cart.length > 0) {
                sum += state.deliveryPrice;

                for (let item of state.cart) {
                    sum += item.price * item.count;
                }
            }

            return sum;
        },
        amount(state) {
            let sum = 0;

            if (state.cart.length > 0) {
                for (let item of state.cart) {
                    sum += item.count;
                }
            } else {
                sum = '';
            }

            return sum;
        },
        getFoodCount(state) {
            return name => {
                for (let item of state.cart) {
                    if (item.name === name) {
                        return item.count;
                    }
                }
            };
        },
        getFood(state) {
            return name => {
                for (let good of state.goods) {
                    for (let food of good.foods) {
                        if (food.name === name) {
                            return food;
                        }
                    }
                }
            };
        },
    },
});
