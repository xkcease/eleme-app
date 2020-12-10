<template>
    <wrap direction="column" ref="sellerWrap">
        <div class="seller">
            <content-block class="border-1px--top-none">
                <van-row type="flex" justify="space-between">
                    <van-col>
                        <h2 class="seller__title">{{ seller.name }}</h2>
                        <StarRating :score="seller.score" :size="24" />
                        <p class="seller__sales">
                            ({{ seller.ratingCount }})
                            <span class="seller__sales--count"
                                >月售{{ seller.sellCount }}单</span
                            >
                        </p>
                    </van-col>
                    <van-col span="3" style="text-align: right">
                        <span
                            class="icon-favorite seller__favorite--icon"
                            :class="{ collected: isCollect }"
                            @touchstart="collectSeller"
                        ></span>
                        <span class="seller__favorite--text">{{
                            collectText
                        }}</span>
                    </van-col>
                </van-row>
                <van-row
                    type="flex"
                    justify="space-around"
                    class="seller__delivery border-1px--top"
                >
                    <van-col>
                        <span>起送价</span>
                        <p>
                            <span>{{ seller.minPrice }}</span
                            >元
                        </p>
                    </van-col>
                    <span class="right-line"></span>
                    <van-col>
                        <span>商家配送</span>
                        <p>
                            <span>{{ seller.deliveryPrice }}</span
                            >元
                        </p>
                    </van-col>
                    <span class="right-line"></span>
                    <van-col>
                        <span>平均配送时间</span>
                        <p>
                            <span>{{ seller.deliveryTime }}</span
                            >分钟
                        </p>
                    </van-col>
                </van-row>
            </content-block>
            <content-block title="公告">
                <p class="seller__bulletin">{{ seller.bulletin }}</p>
                <div class="seller__supports">
                    <ol>
                        <li
                            v-for="(support, supportIndex) in seller.supports"
                            :key="supportIndex"
                            class="border-1px--top border-1px border-1px--none"
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
            </content-block>
            <content-block title="商家实景">
                <div class="seller__scene" ref="sceneElem">
                    <ul ref="ulElem">
                        <li
                            v-for="(pic, picIndex) in seller.pics"
                            :key="picIndex"
                        >
                            <img :src="pic" class="seller__pic" />
                        </li>
                    </ul>
                </div>
            </content-block>
            <content-block title="商家信息">
                <div class="seller__info">
                    <ol>
                        <li
                            v-for="(info, i) in seller.infos"
                            :key="i"
                            class="border-1px--top border-1px border-1px--none"
                        >
                            {{ info }}
                        </li>
                    </ol>
                </div>
            </content-block>
        </div>
    </wrap>
</template>

<script>
import Wrap from '../components/Wrap';
import StarRating from '../components/StarRating';
import { mapState } from 'vuex';
import BScroll from 'better-scroll';
import ContentBlock from '../components/ContentBlock.vue';

export default {
    name: 'Seller',
    components: {
        Wrap,
        StarRating,
        ContentBlock,
    },
    data() {
        ContentBlock;
        return {
            isCollect: false,
            collectText: '收藏',
            supportsClassMap: [
                'decrease',
                'discount',
                'special',
                'invoice',
                'guarantee',
            ],
        };
    },
    computed: {
        ...mapState(['seller']),
    },
    methods: {
        collectSeller() {
            this.isCollect = !this.isCollect;
            this.collectText = this.isCollect ? '已收藏' : '收藏';
        },
        setSceneScroll() {
            let offsetWidth = this.seller.pics.length * 126;
            this.$refs.ulElem.style.width = offsetWidth + 'px';

            if (!this.sceneScroll) {
                this.sceneScroll = new BScroll(this.$refs.sceneElem, {
                    scrollX: true,
                    click: true,
                });
            } else {
                this.sceneScroll.refresh();
            }
        },
    },
    mounted() {
        if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.sellerWrap.$el, {
                scrollY: true,
                click: true,
            });
        } else {
            this.sellerScroll.refresh();
        }

        if (this.seller.pics) {
            this.setSceneScroll();
        }
    },
    watch: {
        seller() {
            if (this.seller.pics) {
                this.setSceneScroll();
            }
        },
    },
};
</script>

<style lang="scss">
.seller {
    background-color: #f3f5f7;

    .seller__title {
        font-size: $md-size;
        font-weight: 200;
        margin-bottom: 8px;
    }

    .seller__sales {
        display: inline-block;
        font-size: $xs-size;
        margin-left: 8px;
        color: rgb(77, 85, 93);
    }

    .seller__sales--count {
        margin-left: 12px;
    }

    .seller__favorite--icon {
        display: block;
        font-size: 24px;
        cursor: pointer;
        color: #ccc;
    }

    .collected {
        color: $e-red;
    }

    .seller__favorite--text {
        font-size: $xs-size;
        color: rgb(77, 85, 93);
    }

    .seller__delivery {
        margin-top: 18px;
        padding-top: 18px;
        text-align: center;
        font-size: $xs-size;

        span {
            color: rgb(147, 153, 159);
        }

        p {
            margin-top: 4px;

            span {
                color: eleblack(1);
                font-size: 24px;
            }
        }
    }

    .seller__bulletin {
        font-size: $sm-size;
        color: $e-red;
        line-height: 24px;
        margin-left: 12px;
    }

    .icon--supports {
        display: inline-block;
        width: 16px;
        height: 16px;
        text-indent: -9999px;

        @include supports(3, 16px);
    }

    .seller__supports {
        margin-top: 16px;

        ol {
            li {
                font-size: $sm-size;
                line-height: 12px;
                padding: 16px 0;
                padding-left: 12px;

                span {
                    margin-right: 6px;
                }

                &:last-child {
                    padding-top: 16px;
                    padding-bottom: 0;
                }
            }
        }
    }

    .seller__scene {
        overflow: hidden;

        ul {
            li {
                display: inline-block;
                margin-right: 6px;
            }
        }
    }

    .seller__pic {
        width: 120px;
        height: 90px;
    }

    .seller__info {
        ol {
            li {
                font-size: $sm-size;
                line-height: 12px;
                padding: 16px 0;
                padding-left: 12px;
                color: eleblack(1);

                span {
                    margin-right: 6px;
                }

                &:last-child {
                    padding-top: 16px;
                    padding-bottom: 0;
                }
            }
        }
    }
}
</style>
