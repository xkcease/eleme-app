<template>
    <div class="comment-filter">
        <div class="comment-filter__tag--wrap">
            <span
                class="comment-filter__tag"
                :class="{ 'comment-filter__tag--select': selected === 2 }"
                @click="changeSelected(2)"
            >
                全部
                <em>{{ ratings.length }}</em>
            </span>
            <span
                class="comment-filter__tag"
                @click="changeSelected(0)"
                :class="{ 'comment-filter__tag--select': selected === 0 }"
            >
                满意
                <em>{{ greatCount }}</em>
            </span>
            <span
                class="comment-filter__tag comment-filter__tag--bad"
                @click="changeSelected(1)"
                :class="{ 'comment-filter__tag--select': selected === 1 }"
            >
                不满意
                <em>{{ badCount }}</em>
            </span>
        </div>
        <div
            class="comment-filter__content border-1px--top"
            @click="contentOnly"
        >
            <span
                class="icon-check_circle"
                :class="{ active: isContentOnly }"
            ></span>
            <span>只看有内容的评价</span>
        </div>
        <van-radio-group
            v-model="orderValue"
            icon-size="12px"
            direction="horizontal"
            class="comment__order"
        >
            <van-radio :name="0">按时间</van-radio>
            <van-radio :name="1">按评分</van-radio>
        </van-radio-group>
        <div class="border-1px line"></div>
    </div>
</template>

<script>
export default {
    name: 'CommentFilter',
    props: {
        ratings: Array,
        selected: {
            type: Number,
            default: 2,
        },
        isContentOnly: {
            type: Boolean,
            default: false,
        },
        orderMode: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            orderValue: this.orderMode,
        };
    },
    computed: {
        greatCount() {
            let count = 0;

            for (let rating of this.ratings) {
                if (rating.rateType === 0) {
                    count++;
                }
            }

            return count;
        },
        badCount() {
            return this.ratings.length - this.greatCount;
        },
    },
    watch: {
        orderValue() {
            this.$emit('update:orderMode', this.orderValue);
        },
    },
    methods: {
        contentOnly() {
            this.$emit('update:isContentOnly', !this.isContentOnly);
        },
        changeSelected(value) {
            this.$emit('update:selected', value);
        },
    },
};
</script>

<style lang="scss">
.comment-filter {
    .comment-filter__tag {
        display: inline-block;
        font-size: $md-size;
        padding: 8px;
        background-color: eleblue(0.2);
        border-radius: 2px;
        margin-right: 8px;
        color: elegrey(1);
        cursor: pointer;

        em {
            font-size: 10px;
        }
    }

    .comment-filter__tag--all {
        background-color: eleblue(1);
        color: $e-white;
    }

    .comment-filter__tag--bad {
        background-color: elegrey(0.2);
    }

    .comment-filter__tag--select {
        background-color: eleblue(1);
        color: $e-white;
    }

    .comment-filter__content {
        width: 60%;
        margin-top: 18px;
        padding: 12px 0;
        font-size: $sm-size;
        color: $e-grey;
        cursor: pointer;
    }

    .icon-check_circle {
        font-size: 24px;
        vertical-align: middle;
        margin-right: 4px;

        &.active {
            color: #07c160;
        }
    }

    .comment__order {
        font-size: $sm-size;
        position: absolute;
        right: 12px;
        top: 84px;
    }

    .line {
        width: 100%;
        position: absolute;
        right: 0;
    }
}
</style>
