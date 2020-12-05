<template>
    <div class="home">
        <Topbar :sellerProp="sellerProp" />
        <router-view />
    </div>
</template>

<script>
    import Topbar from "../components/header/Topbar";
    import axios from "axios";
    import { mapMutations } from 'vuex';

    export default {
        name: "Home",
        components: {
            Topbar,
        },
        data() {
            return {
                ratingsProp: [],
                sellerProp: {},
            };
        },
        methods: {
            ...mapMutations(['updateDeliveryPrice', 'updateMinPrice'])
        },
        beforeRouteEnter(to, from, next) {
            function getRatings() {
                return axios.get("/api/ratings");
            }

            function getSeller() {
                return axios.get("/api/seller");
            }

            Promise.all([getRatings(), getSeller()]).then(
                ([ratingsData, sellerData]) => {
                    next((vm) => {
                        vm.ratingsProp = ratingsData.data;
                        vm.sellerProp = sellerData.data;
                        vm.updateDeliveryPrice({ deliveryPrice: sellerData.data.deliveryPrice });
                        vm.updateMinPrice({ minPrice: sellerData.data.minPrice });
                    });
                }
            );
        },
    };
</script>

<style lang="scss">
    .home {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 53px;
    }
</style>