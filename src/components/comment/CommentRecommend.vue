<template>
    <div class="comment-recommend">
        <span
            :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'"
        ></span>
        <span
            v-for="(rec, recIndex) in rating.recommend"
            :key="recIndex"
            class="comment-recommend__tag"
            >{{ rec }}</span
        >
    </div>
</template>

<script>
export default {
    name: 'CommentRecommend',
    props: {
        rating: Object,
    },
};
</script>

<style lang="scss">
.comment-recommend__tag {
    display: inline-block;
    font-size: 9px;
    color: $e-grey;
    margin-left: 8px;
    border: 1px solid eleblack(0.1);
    padding: 0 6px;
    line-height: 16px;
}

.icon-thumb_up {
    font-size: $sm-size;
    color: eleblue(1);
}

.icon-thumb_down {
    font-size: $sm-size;
    color: $e-grey;
}
</style>
