<template>
    <div class="topbar">
        <div class="topbar-seller" @click="changeOverlay">
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
                    <div class="topbar-seller__supports">
                        <div class="topbar-seller__swipe">
                            <ol ref="swipeOl">
                                <li
                                    v-for="(support, supportIndex) in seller.supports"
                                    :key="supportIndex"
                                >
                                    <span
                                        class="icon--supports"
                                        :class="supportsClassMap[support.type]"
                                        >优惠
                                    </span>
                                    {{ support.description }}
                                </li>
                            </ol>
                        </div>
                        <div class="topbar-seller__supports--count">
                            {{ isSupports }}个
                            <span
                                class="icon--more icon-keyboard_arrow_right"
                            ></span>
                        </div>
                    </div>
                </van-col>
            </van-row>
            <div class="topbar-seller__bulletin">
                <span class="icon--bulletin"></span>
                <p class="topbar-seller__bulletin--detail">
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
        <Overlay
            v-show="isCover"
            @changeOverlay="changeOverlay"
            :supportsClassMap="supportsClassMap"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Overlay from './Overlay';

export default {
    name: 'Topbar',
    components: {
        Overlay,
    },
    data() {
        return {
            tabItemList: ['商品', '评价', '商家'],
            currentTabIndex: 0,
            isCover: false,
        };
    },
    computed: {
        ...mapState(['seller']),
        isSupports() {
            return this.seller.supports && this.seller.supports.length;
        },
    },
    props: {
        sellerProp: Object,
        supportsClassMap: Array,
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
        changeOverlay() {
            this.isCover = !this.isCover;
        },
    },
    mounted() {},
    beforeDestroy() {},
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

            @include bg-img('/icon/brand', '30px');
        }

        .icon--supports {
            display: inline-block;
            width: 12px;
            height: 12px;
            text-indent: -9999px;
            background-size: 12px 12px;
            background-repeat: no-repeat;

            @include supports(1, 12px);
        }

        .topbar-seller__name {
            font-size: $lg-size;
            font-weight: bold;
            line-height: 18px;
        }

        .topbar-seller__delivery {
            font-size: $sm-size;
            line-height: 12px;
            margin-top: 8px;
        }

        .topbar-seller__supports {
            font-size: $xs-size;
            line-height: 12px;
            margin-top: 10px;
            position: relative;

            ol {
                li {
                    width: 70%;
                    height: 12px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

        .topbar-seller__swipe {
            height: 12px;
            overflow: hidden;
        }

        .topbar-seller__supports--count {
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

        .topbar-seller__bulletin {
            display: flex;
            align-items: center;
            height: 28px;
            margin-top: 18px;
            padding-left: 12px;
            background-color: eleblack(0.2);
            font-size: $xs-size;
        }

        .icon--bulletin {
            display: inline-block;
            width: 16px;
            height: 10px;
            background-size: 16px 10px;
            @include bg-img('/icon/bulletin', '16px');
        }

        .topbar-seller__bulletin--detail {
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
            font-size: $md-size;
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
