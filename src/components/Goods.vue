<template>
    <wrap>
        <div class="goods-siderbar" ref="goodsSiderbar">
            <van-sidebar v-model="activeKey" ref="siderbar">
                <van-sidebar-item
                    v-for="(good, goodIndex) in goods"
                    :key="goodIndex"
                    :title="good.name"
                    class="goods-sidebar__item border-1px--center border-1px border-1px--none"
                    :class="checkGoodType(good.type, goodIndex)"
                    @click="selectItem(goodIndex)"
                />
            </van-sidebar>
        </div>
        <div class="goods-list" ref="goodsList">
            <div>
                <div
                    v-for="(good, index) in goods"
                    :key="index"
                    ref="goodsElem"
                >
                    <dt class="goods-list__name">
                        <p>{{ good.name }}</p>
                    </dt>
                    <dd class="goods-list__list">
                        <ol>
                            <li
                                v-for="(item, index) in good.foods"
                                :key="index"
                                class="border-1px border-1px--good border-1px--none"
                            >
                                <van-card
                                    :title="item.name"
                                    :desc="item.description"
                                    :price="item.price"
                                    :thumb="item.icon"
                                >
                                    <template #tags>
                                        <p style="margin-top: 8px">
                                            月售{{ item.sellCount }}份 好评率{{
                                                item.rating
                                            }}%
                                        </p>
                                    </template>
                                    <template #footer>
                                        <div class="goods-item__control">
                                            <span
                                                class="goods-item__control--minus icon-remove_circle_outline"
                                            ></span>
                                            <span
                                                class="goods-item__control--count"
                                                >1</span
                                            >
                                            <span
                                                class="goods-item__control--add icon-add_circle"
                                                @click="addGood(index)"
                                            ></span>
                                        </div>
                                    </template>
                                </van-card>
                            </li>
                        </ol>
                    </dd>
                </div>
            </div>
        </div>
    </wrap>
</template>


<script>
import axios from 'axios';
import Wrap from './Wrap';
import BScroll from 'better-scroll';
import '../assets/style/base.scss';

export default {
    components: {
        Wrap,
    },
    data() {
        return {
            activeKey: 0,
            goods: [],
            wealIcons: [
                'icon--decrease_3',
                'icon--discount_3',
                'icon--special_3',
                'icon--invoice_3',
                'icon--guarantte_3',
            ],
            scrollY: 0,
            listHeight: [],
        };
    },
    methods: {
        checkGoodType(type, goodIndex) {
            if (type < 0) {
                return {
                    [this.wealIcons[type]]: false,
                    'icon--good': false,
                    active: this.currentIndex === goodIndex,
                };
            }
            return {
                [this.wealIcons[type]]: true,
                'icon--good': true,
                active: this.currentIndex === goodIndex,
            };
        },
        initScroll() {
            this.leftScroll = new BScroll(this.$refs.goodsSiderbar, {
                scrollY: true,
                click: true,
            });

            this.rightScroll = new BScroll(this.$refs.goodsList, {
                scrollY: true,
                click: true,
                probeType: 3,
            });

            this.rightScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        selectItem(index) {
            this.rightScroll.scrollToElement(this.$refs.goodsElem[index], 300);
        },
        _calculateHeight() {
            let height = 0;
            this.listHeight.push(height);

            for (let elem of this.$refs.goodsElem) {
                height += elem.clientHeight;
                this.listHeight.push(height);
            }
        },
        _followSiderbar(index) {
            let elem = this.$refs.siderbar.$el;
            this.leftScroll.scrollToElement(elem.childNodes[index], 300);
        },
        addGood(index) {
            console.log(index);
        },
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (
                    !height2 ||
                    (this.scrollY >= height1 && this.scrollY < height2)
                ) {
                    this._followSiderbar(i);
                    return i;
                }
            }
            return 0;
        },
    },
    beforeRouteEnter(to, from, next) {
        axios.get('/api/goods').then((res) => {
            next((vm) => {
                vm.goods = res.data;
            });
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.initScroll();
            this._calculateHeight();
        });
    },
};
</script>


<style lang="scss">
.goods-sidebar {
    overflow: hidden;
    height: 70vh;
}

.goods-sidebar__item {
    height: 54px;
    font-size: 12px;
    font-weight: 200;
    line-height: 14px;

    &.active {
        background-color: #fff;

        &::before {
            position: absolute;
            top: 50%;
            left: 0;
            width: 4px;
            height: 16px;
            background-color: #ee0a24;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            content: '';
        }
    }
}

.border-1px--center::after {
    width: 70%;
    left: 50%;
    margin-left: -30px;
}

.border-1px--good::after {
    width: 263px;
    left: 50%;
    margin-left: -131px;
}

.icon--good {
    background-size: 12px 12px;
    background-repeat: no-repeat;
    background-position: 13px;
    text-indent: 15px;

    div {
        margin-left: -15px;
    }
}

.goods-list {
    flex-grow: 1;
    width: 200px;

    .goods-list__name {
        height: 26px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 26px;
        background-color: #f3f5f7;
        border-left: 2px solid #d9dde1;
        font-weight: 200;
        padding-left: 14px;
    }
}
.goods-item__control {
    height: 20px;
    position: absolute;
    bottom: 8px;
    right: 16px;
    font-size: 20px;
}

.goods-item__control--add {
    color: rgb(0, 160, 220);
}

.goods-item__control--minus {
    color: rgb(0, 160, 220);
}

.goods-item__control--count {
    font-size: 14px;
    color: rgb(147, 153, 159);
    margin: 0 10px;
    padding-bottom: 5px;
    display: inline-block;
    vertical-align: middle;
}

.van-card__content {
    padding-left: 2px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}

.van-card__title {
    font-size: 14px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
}

.van-card__price-currency {
    color: rgb(240, 20, 20);
}

.van-card__price-integer {
    color: rgb(240, 20, 20);
    margin-left: 3px;
}

.van-sidebar-item--select {
    background-color: #f7f8fa;

    &::before {
        width: 0;
        height: 0;
    }
}
</style>