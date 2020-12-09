<template>
    <div class="overlay" @click="changeOverlay">
        <div class="overlay--wrap">
            <h2 class="overlay__name">{{ seller.name }}</h2>
            <StarRating :score="seller.score" />
            <div class="overlay__block">
                <div class="overlay__title">
                    <span class="overlay__title--line"></span>
                    <h2 class="overlay__title--text">优惠信息</h2>
                    <span class="overlay__title--line"></span>
                </div>
                <div class="overlay__supports">
                    <ol>
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
            </div>
            <div class="overlay__block">
                <div class="overlay__title">
                    <span class="overlay__title--line"></span>
                    <h2 class="overlay__title--text">商家公告</h2>
                    <span class="overlay__title--line"></span>
                </div>
                <p class="overlay__bulletin">
                    {{ seller.bulletin }}
                </p>
            </div>
            <span class="icon-close" @click="changeOverlay"></span>
        </div>
    </div>
</template>

<script>
import StarRating from '../StarRating';
import { mapState } from 'vuex';

export default {
    name: 'Overlay',
    components: {
        StarRating,
    },
    props: {
        supportsClassMap: Array,
    },
    computed: {
        ...mapState(['seller']),
    },
    methods: {
        changeOverlay() {
            this.$emit('changeOverlay');
        },
    },
};
</script>

<style lang="scss">
.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 7777;
    background: eleblack(0.7);
    color: white;
    backdrop-filter: blur(10px);

    .overlay--wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 64px 36px 32px 36px;
        text-align: center;
    }

    .overlay__name {
        font-size: $lg-size;
        font-weight: 700;
        line-height: 16px;
        margin-bottom: 12px;
    }

    .overlay__block {
        margin-top: 28px;
        text-align: left;
    }
    .overlay__title--line {
        display: inline-block;
        height: 1px;
        flex-grow: 1;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .overlay__title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 24px;
    }

    .overlay__title--text {
        display: inline-block;
        font-size: $md-size;
        font-weight: 700;
        color: rgb(255, 255, 255);
        line-height: 14px;
        margin: 0 12px;
    }

    .overlay__supports {
        ol {
            li {
                font-size: $sm-size;
                line-height: 12px;
                margin-bottom: 12px;

                span {
                    margin-right: 6px;
                }
            }
        }
    }

    .overlay__bulletin {
        font-size: $sm-size;
        line-height: 24px;
    }

    .icon--supports {
        display: inline-block;
        width: 16px;
        height: 16px;
        text-indent: -9999px;

        @include supports(1, 16px);
    }

    .icon-close {
        font-size: 32px;
        color: rgb(255, 255, 255, 0.5);
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
    }
}
</style>
