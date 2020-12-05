<template>
    <div class="wrap">
        <slot></slot>
    </div>
</template>


<script>
    export default {

    };
</script>


<style lang="scss">
    .wrap {
        display: flex;
        width: 100%;
        min-height: 300px;
        position: absolute;
        top: 179px;
        bottom: 0;
        overflow: hidden;
    }
</style>