<template>
    <div id="app">
        <Topbar :sellerProp="sellerProp" :supportsClassMap="supportsClassMap" />
        <transition name="tab-slide">
            <router-view />
        </transition>
        <Cart />
    </div>
</template>

<script>
import './assets/css/icon.css';
import Cart from './components/Cart';
import Topbar from './components/header/Topbar';
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    components: {
        Cart,
        Topbar,
    },
    data() {
        return {
            ratingsProp: [],
            sellerProp: {},
            supportsClassMap: [
                'decrease',
                'discount',
                'special',
                'invoice',
                'guarantee',
            ],
        };
    },
    methods: {
        ...mapMutations([
            'updateDeliveryPrice',
            'updateMinPrice',
            'updateSeller',
        ]),
    },
    mounted() {
        axios.get('/api/seller').then(res => {
            this.sellerProp = res.data;
            this.updateDeliveryPrice({
                deliveryPrice: this.sellerProp.deliveryPrice,
            });
            this.updateMinPrice({ minPrice: this.sellerProp.minPrice });
            this.updateSeller({ seller: this.sellerProp });
        });

        axios.get('/api/ratings').then(res => {
            this.ratingsProp = res.data;
        });
    },
};
</script>

<style lang="scss">
.tab-slide-enter-active,
.tab-slide-leave-active {
    transition: all 0.2s linear;
}

.tab-slide-enter,
.tab-slide-leave-to {
    transform: translateX(100%);
}
</style>
