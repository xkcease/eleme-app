<template>
    <div class="item-control">
        <transition name="slide-fade">
            <span
                v-if="getFoodCount(item.name)"
                @touchstart.stop="minusGood(item)"
                class="item-control__minus icon-remove_circle_outline"
            ></span>
        </transition>
        <span v-if="getFoodCount(item.name)" class="item-control__count">{{
            getFoodCount(item.name)
        }}</span>
        <span
            class="item-control__add icon-add_circle"
            @touchstart.stop="addGood(item)"
        ></span>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
    props: {
        item: Object,
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['getFoodCount']),
    },
    methods: {
        ...mapMutations(['insertFood', 'deleteFood']),
        addGood(item) {
            this.insertFood({ name: item.name, price: item.price });
        },
        minusGood(item) {
            this.deleteFood({ name: item.name, price: item.price });
        },
    },
};
</script>

<style lang="scss">
.item-control {
    height: 20px;
    position: absolute;
    bottom: 8px;
    right: 16px;
    font-size: 20px;
}

.item-control__add {
    color: rgb(0, 160, 220);
}

.item-control__minus {
    color: rgb(0, 160, 220);
}

.item-control__count {
    font-size: 14px;
    color: rgb(147, 153, 159);
    margin: 0 10px;
    padding-bottom: 5px;
    display: inline-block;
    vertical-align: middle;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s linear;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: rotate(360deg) translateX(10px);
    opacity: 0;
}
</style>
