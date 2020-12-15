<template>
    <wrap direction="column" ref="commentWrap">
        <div class="comment" ref="commentElem">
            <content-block class="border-1px--top-none">
                <div class="comment__rating">
                    <div class="comment__rank">
                        <p class="comment__score">{{ seller.score }}</p>
                        <p>综合评分</p>
                        <p class="comment__rate">
                            高于周边商家{{ seller.rankRate }}%
                        </p>
                    </div>
                    <span class="right-line"></span>
                    <div class="comment__service">
                        <div class="comment__service--block">
                            <span class="comment__service--text">服务态度</span>
                            <StarRating
                                :score="seller.serviceScore"
                                :size="30"
                            />
                            <span class="comment__score--service">{{
                                seller.serviceScore
                            }}</span>
                        </div>
                        <div class="comment__service--block">
                            <span class="comment__service--text">商品评分</span>
                            <StarRating :score="seller.foodScore" :size="30" />
                            <span class="comment__score--service">{{
                                seller.foodScore
                            }}</span>
                        </div>
                        <p>
                            <span class="comment__service--text">送达时间</span>
                            <span class="comment__service--delivery"
                                >{{ seller.deliveryTime }}分钟</span
                            >
                        </p>
                    </div>
                </div>
            </content-block>
            <content-block>
                <CommentFilter
                    :ratings="ratings"
                    :selected.sync="selected"
                    :isContentOnly.sync="isContentOnly"
                    :orderMode.sync="orderMode"
                />
                <div class="comment__list">
                    <van-skeleton
                        title
                        avatar
                        row="3"
                        :loading="loading"
                        style="margin-top: 8px"
                        v-for="(rating, ratingIndex) in selectedRatings"
                        :key="ratingIndex"
                    >
                        <div class="comment__item border-1px">
                            <div>
                                <img
                                    :src="rating.avatar"
                                    class="comment__avatar"
                                />
                            </div>
                            <div class="comment__item--right">
                                <p>{{ rating.username }}</p>
                                <div class="comment__item--score">
                                    <StarRating
                                        :size="20"
                                        :score="rating.score"
                                    />
                                    <span v-if="rating.deliveryTime"
                                        >{{ rating.deliveryTime }}分钟送达</span
                                    >
                                </div>
                                <p class="comment__text">{{ rating.text }}</p>
                                <CommentRecommend :rating="rating" />
                            </div>
                            <div class="comment__time">
                                {{ formatDate(rating.rateTime) }}
                            </div>
                        </div>
                    </van-skeleton>
                </div>
            </content-block>
        </div>
    </wrap>
</template>

<script>
import StarRating from '../components/StarRating';
import ContentBlock from '../components/ContentBlock';
import CommentFilter from '../components/comment/CommentFilter';
import CommentRecommend from '../components/comment/CommentRecommend';
import BScroll from 'better-scroll';
import Wrap from '../components/Wrap';
import { mapState } from 'vuex';
import axios from 'axios';
import { formatDate } from '../assets/js/util';

export default {
    name: 'Comment',
    data() {
        return {
            loading: true,
            ratings: [],
            selected: 2,
            isContentOnly: false,
            orderMode: 0,
        };
    },
    components: {
        Wrap,
        StarRating,
        ContentBlock,
        CommentFilter,
        CommentRecommend,
    },
    computed: {
        ...mapState(['seller']),
        selectedRatings() {
            let array = JSON.parse(JSON.stringify(this.ratings));

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

            if (this.orderMode === 0) {
                array.sort((a, b) => {
                    return b.rateTime - a.rateTime;
                });
            } else if (this.orderMode === 1) {
                array.sort((a, b) => {
                    return b.score - a.score;
                });
            }

            return array;
        },
    },
    methods: {
        formatDate,
        setCommentScroll() {
            if (!this.commentScroll) {
                this.commentScroll = new BScroll(this.$refs.commentWrap.$el, {
                    scrollY: true,
                    click: true,
                });
            } else {
                this.commentScroll.refresh();
            }
        },
        responseTag(value) {
            this.selected = value;
        },
    },
    watch: {
        selectedRatings() {
            setTimeout(() => {
                this.setCommentScroll();
            }, 0);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.setCommentScroll();
        });
    },
    beforeRouteEnter(to, from, next) {
        axios.get('/api/ratings').then((res) => {
            next((vm) => {
                vm.ratings = res.data;
                vm.loading = false;
            });
        });
    },
};
</script>

<style lang="scss">
.comment {
    background-color: #f3f5f7;

    .comment__rating {
        display: flex;
        justify-content: space-between;
        font-size: $sm-size;
        text-align: center;
    }

    .comment__score {
        font-size: 24px;
        color: $e-yellow;
        margin-bottom: 6px;
    }

    .comment__rate {
        font-size: $xs-size;
        color: $e-grey;
        margin-top: 8px;
        margin-bottom: 6px;
    }

    .comment__service {
        text-align: left;
    }

    .comment__service--block {
        margin-bottom: 8px;
    }

    .comment__service--text {
        margin-right: 12px;
    }

    .comment__score--service {
        font-size: $sm-size;
        color: $e-yellow;
        margin-left: 12px;
    }

    .comment__service--delivery {
        color: $e-grey;
    }

    .comment__list {
        // min-height: 600px;
    }

    .comment__item {
        display: flex;
        padding: 18px 0;
    }

    .comment__avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }

    .comment__item--right {
        margin-left: 12px;
        font-size: $xs-size;
        color: eleblack(1);
    }

    .comment__item--score {
        margin-top: 4px;
        margin-bottom: 6px;
        color: $e-grey;

        & > span {
            margin-left: 6px;
        }
    }

    .comment__text {
        font-size: $sm-size;
        margin-bottom: 8px;
    }

    .comment__time {
        font-size: $xs-size;
        color: $e-grey;
        line-height: 12px;
        position: absolute;
        right: 0;
    }
}
</style>
