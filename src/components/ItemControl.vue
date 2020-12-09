<template>
    <div class="item-control">
        <transition name="slide-fade">
            <span
                v-if="item.count"
                @touchstart="minusGood(item)"
                class="item-control__minus icon-remove_circle_outline"
            ></span>
        </transition>
        <span v-if="item.count" class="item-control__count">{{
            item.count
        }}</span>
        <span
            class="item-control__add icon-add_circle"
            @touchstart="addGood(item)"
        ></span>
    </div>
</template>

<script>
export default {
    props: {
        itemProp: Object,
    },
    data() {
        return {
            item: this.itemProp,
        };
    },
    methods: {
        addGood(item) {
            if (!item.count) {
                this.$set(item, 'count', 1);
            } else {
                item.count++;
            }
        },
        minusGood(item) {
            if (item.count > 0) {
                item.count--;
            }
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
