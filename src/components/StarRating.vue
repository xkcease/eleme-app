<template>
    <div class="star-rating">
        <span
            v-for="(star, index) in starItems"
            :key="index"
            :class="[`icon--star-${size}`, `star-${star}`]"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'starRating',
    props: {
        score: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
            default: 48,
        },
    },
    data() {
        return {
            starCount: 5,
        };
    },
    computed: {
        starItems() {
            let num = Math.floor(this.score * 2) / 2;
            let result = [];

            for (let i = 0; i < this.starCount; i++) {
                if (i < Math.floor(num)) {
                    result.push('on');
                } else if (i === Math.floor(num) && i < num) {
                    result.push('half');
                } else {
                    result.push('off');
                }
            }

            return result;
        },
    },
};
</script>

<style lang="scss">
.star-rating {
    display: inline-block;
    vertical-align: middle;
    text-align: center;

    @include stars(48, 24);
    @include stars(36, 8);
    @include stars(24, 2);
}
</style>
