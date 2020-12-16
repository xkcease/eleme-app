<template>
    <div class="food" ref="foodElem">
        <div>
            <span class="icon-arrow_lift icon--back" @click="goBack"></span>
            <div style="height: 325px">
                <img :src="food.image" class="food__img" />
            </div>
            <content-block :title="food.name" class="h">
                <div class="food__detail">
                    <div>
                        <p class="food__rank">
                            月售{{ food.sellCount }}份
                            <span>好评率{{ food.rating }}%</span>
                        </p>
                        <p style="margin-top: 18px">
                            <span class="food__price">￥{{ food.price }}</span>
                            <span v-if="food.oldPrice"
                                >￥{{ food.oldPrice }}</span
                            >
                        </p>
                    </div>
                    <div style="position: relative; flex: 1">
                        <span class="food__add" @click="addFood"
                            >加入购物车</span
                        >
                    </div>
                </div>
            </content-block>
            <content-block v-if="food.info" title="商品介绍">
                <p class="food__info">{{ food.info }}</p>
            </content-block>
            <content-block title="商品评价">
                <CommentFilter
                    :ratings="food.ratings"
                    :selected.sync="selected"
                    :isContentOnly.sync="isContentOnly"
                    :hasOrder="false"
                    :topValue="'113px'"
                />
                <div
                    class="food__comment border-1px"
                    v-for="(rating, index) in selectedRatings"
                    :key="index"
                >
                    <div class="food__comment--head">
                        <span>{{ formatDate(rating.rateTime) }}</span>
                        <div>
                            <span>{{ rating.username }}</span>
                            <img class="food__avatar" :src="rating.avatar" />
                        </div>
                    </div>
                    <div class="food__rating">
                        <CommentRecommend :rating="rating" />
                        <p class="food__text">{{ rating.text }}</p>
                    </div>
                </div>
            </content-block>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import ContentBlock from '../components/ContentBlock';
import CommentFilter from '../components/comment/CommentFilter';
import CommentRecommend from '../components/comment/CommentRecommend';
import { formatDate } from '../assets/js/util';

export default {
    name: 'Food',
    components: {
        ContentBlock,
        CommentFilter,
        CommentRecommend,
    },
    props: {
        name: String,
    },
    data() {
        return {
            food: {},
            selected: 2,
            isContentOnly: false,
        };
    },
    computed: {
        ...mapGetters(['getFood']),
        selectedRatings() {
            let array = JSON.parse(JSON.stringify(this.food.ratings));

            if (this.selected !== 2) {
                array = array.filter((item) => {
                    return item.rateType === this.selected;
                });
            }

            if (this.isContentOnly) {
                array = array.filter((item) => {
                    return Boolean(item.text);
                });
            }

            return array;
        },
    },
    methods: {
        formatDate,
        ...mapMutations(['insertFood']),
        setFoodScroll() {
            if (!this.foodScroll) {
                this.foodScroll = new BScroll(this.$refs.foodElem, {
                    scrollY: true,
                    click: true,
                });
            } else {
                this.foodScroll.refresh();
            }
        },
        goBack() {
            this.$router.back();
        },
        addFood() {
            this.insertFood({ name: this.food.name, price: this.food.price });
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.food = vm.getFood(vm.name);
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.setFoodScroll();
        });
    },
};
</script>

<style lang="scss">
.food {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 52px;
    background-color: #f3f5f7;
    z-index: 555;
    overflow: hidden;

    .icon--back {
        display: inline-block;
        position: absolute;
        top: 20px;
        left: 15px;
        font-size: 20px;
        color: #fff;
    }

    .food__img {
        width: 100%;
        height: 325px;
    }

    .h {
        h2 {
            font-weight: 700;
        }
    }

    .food__detail {
        display: flex;
        justify-content: space-between;
    }

    .food__rank {
        font-size: $xs-size;
        color: $e-grey;
    }

    .food__price {
        font-size: $md-size;
        color: $e-red;
        font-weight: 700;
    }

    .food__add {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 6px 12px;
        font-size: $xs-size;
        color: #fff;
        font-weight: 500;
        line-height: 12px;
        border-radius: 24px;
        background-color: eleblue(1);
        cursor: pointer;
    }

    .food__info {
        font-size: $sm-size;
        color: elegrey(1);
        line-height: 24px;
    }

    .food__comment {
        padding: 16px 0;
    }

    .food__comment--head {
        display: flex;
        justify-content: space-between;
        color: $e-grey;
        font-size: $xs-size;
        line-height: 12px;
    }

    .food__avatar {
        width: 12px;
        height: 12px;
        margin-left: 6px;
        border-radius: 50%;
        vertical-align: middle;
    }

    .food__rating {
        display: flex;
        line-height: 24px;
    }

    .food__text {
        display: inline-block;
        font-size: $sm-size;
        margin-left: 4px;
    }
}
</style>
