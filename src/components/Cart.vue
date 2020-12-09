<template>
    <div class="cart">
        <van-row
            class="cart__wrap"
            type="flex"
            justify="space-between"
            align="center"
        >
            <van-col class="cart-col cart__icon" span="4">
                <van-badge :content="amount">
                    <div class="cart-icon--wrap" @click="showPopup">
                        <span
                            class="icon-shopping_cart cart-icon"
                            :class="{ active: hasGoods }"
                        ></span>
                    </div>
                </van-badge>
            </van-col>
            <van-col class="cart-col cart__text" span="10">
                <span>￥{{ total }}</span>
                <span class="cart__text--line"></span>
                <span class="cart__text--delivery-price"
                    >另需配送费￥{{ deliveryPrice }}元</span
                >
            </van-col>
            <van-col
                class="cart-col cart__pay"
                :class="{ active: canPay }"
                span="8"
            >
                <span>￥{{ minPrice }} 起送</span>
            </van-col>
        </van-row>
        <van-popup v-model="isShow" position="bottom">
            <div class="">
                <van-cell title="购物车" class="cart-list__title">
                    <span class="cart-list--clear">清空</span>
                </van-cell>
                <van-cell-group>
                    <van-cell title="蛋炒饭">
                        <template>
                            <span class="cart-list__price">￥ 10</span>
                        </template>
                        <template #extra>
                            <div>
                                <ItemControl
                                    class="item-control--bottom"
                                    :itemProp="{}"
                                />
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ItemControl from './ItemControl';

export default {
    components: {
        ItemControl,
    },
    data() {
        return {
            isShow: false,
        };
    },
    computed: {
        ...mapState(['total', 'deliveryPrice', 'minPrice', 'amount']),
        hasGoods() {
            return this.amount > 0 ? true : false;
        },
        canPay() {
            return this.total >= this.minPrice ? true : false;
        },
    },
    methods: {
        showPopup() {
            this.isShow = !this.isShow;
        },
    },
};
</script>

<style lang="scss">
.cart {
    width: 100%;
    height: 52px;
    position: absolute;
    bottom: 0;
    background: #141d27;
    color: rgb(255, 255, 255, 0.4);
    font-weight: 700;

    .cart__wrap {
        height: 100%;
        z-index: 5555;
        position: absolute;
        left: 0;
        right: 0;
    }

    .cart-col {
        height: 100%;
        line-height: 52px;
        text-align: center;
        font-size: 16px;
    }

    .cart-icon--wrap {
        margin-left: 18px;
        border-radius: 50%;
        background-color: #141d27;
        height: 58px;
        width: 58px;
        margin-top: -7px;
        line-height: 69px;
    }

    .cart-icon {
        font-size: 25px;
        padding: 10px;
        border-radius: 50%;
        background-color: rgb(255, 255, 255, 0.1);
        cursor: pointer;
    }

    .cart__text--line {
        display: inline-block;
        width: 1px;
        height: 60%;
        background-color: rgb(255, 255, 255, 0.1);
        vertical-align: middle;
        margin-left: 6px;
    }

    .cart__text--delivery-price {
        display: inline-block;
        padding-left: 12px;
        font-size: 12px;
        font-weight: 200;
    }

    .cart__pay {
        background-color: rgb(255, 255, 255, 0.1);
        cursor: pointer;
    }

    .active {
        background-color: rgb(0, 160, 220);
        color: #fff;
    }

    .cart-list__title {
        background-color: #f3f5f7;
        font-weight: 200;
    }

    .cart-list--clear {
        color: rgb(0, 160, 220);
        cursor: pointer;
    }

    .cart-list__price {
        padding-right: 90px;
        color: rgb(240, 20, 20);
    }
}

.item-control--bottom {
    bottom: 12px;
}

.van-badge--fixed {
    right: 12px;
    top: 6px;
}

.van-popup--bottom {
    bottom: 52px;
}
</style>
