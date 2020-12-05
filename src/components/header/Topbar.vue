<template>
    <div class="topbar">
        <div class="topbar-seller">
            <img class="topbar-seller--bg" :src="seller.avatar" />
            <van-row class="topbar-seller__wrap" type="flex">
                <van-col span="6">
                    <img class="topbar-seller__img" :src="seller.avatar" />
                </van-col>
                <van-col span="16" class="l-topbar-seller__text--wrap">
                    <p class="topbar-seller__name">
                        <span class="icon--brand">brand</span>
                        {{ seller.name }}
                    </p>
                    <p class="topbar-seller__delivery">
                        {{ seller.description }} /
                        {{ seller.deliveryTime }}分钟送达
                    </p>
                    <div v-if="seller.supports" class="topbar-seller__weal">
                        <span
                            class="icon--weal"
                            :class="wealIcons[seller.supports[0].type]"
                            >优惠</span
                        >
                        {{ seller.supports[0].description }}
                        <div class="topbar-seller__weal--count">
                            {{ seller.supports.length }}个
                            <span
                                class="icon--more icon-keyboard_arrow_right"
                            ></span>
                        </div>
                    </div>
                </van-col>
            </van-row>
            <div class="topbar-seller__notice">
                <span class="icon--notice"></span>
                <p class="topbar-seller__notice--detail">
                    {{ seller.bulletin }}
                </p>
                <span class="icon--more icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="topbar-tab border-1px">
            <ul class="topbar-tab__wrap">
                <li
                    v-for="(item, index) in tabItemList"
                    :key="item"
                    class="topbar-tab__item"
                    :class="{ active: index === currentTabIndex }"
                    @touchstart="changeTab(index)"
                >
                    <span>{{ item }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import '../../assets/style/icon.scss';
import '../../assets/style/base.scss';

export default {
    data() {
        return {
            seller: {},
            wealIcons: [
                'icon--decrease',
                'icon--discount',
                'icon--special',
                'icon--invoice',
                'icon--guarantte',
            ],
            tabItemList: ['商品', '评价', '商家'],
            currentTabIndex: 0,
        };
    },
    computed: {},
    props: {
        sellerProp: Object,
    },
    watch: {
        sellerProp() {
            this.seller = this.sellerProp;
        },
    },
    methods: {
        changeTab(index) {
            this.currentTabIndex = index;

            if (index === 0) {
                this.$router.push({ name: 'goods' });
            } else if (index === 1) {
                this.$router.push({ name: 'comment' });
            } else if (index === 2) {
                this.$router.push({ name: 'seller' });
            }
        },
    },
};
</script>


<style lang="scss">
.topbar {
    width: 100%;
    position: absolute;
    top: 0;

    .topbar-seller__wrap {
        height: 68px;
    }
    .topbar-seller {
        background: rgba(7, 17, 27, 0.5);
        padding-top: 24px;
        color: rgb(255, 255, 255);

        .topbar-seller--bg {
            width: 100%;
            height: 134px;
            position: absolute;
            top: 0;
            filter: blur(10px);
            z-index: -999;
        }

        .topbar-seller__img {
            width: 64px;
            height: 64px;
            border-radius: 4px;
            margin-left: 24px;
        }

        .l-topbar-seller__text--wrap {
            margin-left: 16px;
        }

        .icon--brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            text-indent: -9999px;
            background-size: 30px 18px;
            background-repeat: no-repeat;

            @media screen and (-webkit-device-pixel-ratio: 2) {
                background-image: url(../../assets/icon/brand@2x.png);
            }

            @media screen and (-webkit-device-pixel-ratio: 3) {
                background-image: url(../../assets/icon/brand@3x.png);
            }
        }

        .topbar-seller__name {
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
        }

        .topbar-seller__delivery {
            font-size: 12px;
            font-weight: 200;
            line-height: 12px;
            margin-top: 8px;
        }

        .topbar-seller__weal {
            font-size: 10px;
            font-weight: 200;
            line-height: 12px;
            margin-top: 10px;
            position: relative;
        }

        .topbar-seller__weal--count {
            display: inline-block;
            border-radius: 12px;
            width: 30px;
            text-align: center;
            padding: 7px;
            background-color: rgb(0, 0, 0, 0.2);
            position: absolute;
            right: 0;
            bottom: 0;
        }

        .icon--more {
            vertical-align: middle;
        }

        .topbar-seller__notice {
            display: flex;
            align-items: center;
            height: 28px;
            margin-top: 18px;
            padding-left: 12px;
            background-color: rgba(7, 17, 27, 0.2);
            font-size: 10px;
            font-weight: 200;
        }

        .icon--notice {
            display: inline-block;
            width: 16px;
            height: 10px;
            background-size: 16px 10px;
            background-image: url(../../assets/icon/bulletin@2x.png);
        }

        .topbar-seller__notice--detail {
            display: inline-block;
            width: 90%;
            margin-left: 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .topbar-tab {
        height: 40px;
        background-color: rgb(255, 255, 255);

        .topbar-tab__wrap {
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .topbar-tab__item {
            display: block;
            width: 20px;
            height: 40px;
            font-size: 14px;
            color: rgb(77, 85, 93);
            flex-grow: 1;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

            &.active {
                color: rgb(240, 20, 20);
            }
        }
    }
}
</style>