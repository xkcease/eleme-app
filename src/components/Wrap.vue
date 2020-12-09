<template>
    <div class="wrap" :style="getDirection">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        direction: String,
    },
    computed: {
        getDirection() {
            return { 'flex-direction': this.direction };
        },
    },
};
</script>

<style lang="scss">
.wrap {
    display: flex;
    width: 100%;
    min-height: 300px;
    position: absolute;
    top: 179px;
    bottom: 53px;
    overflow: hidden;
}
</style>
