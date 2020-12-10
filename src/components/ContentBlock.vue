<template>
    <div class="content-block border-1px--top border-1px">
        <h2 class="content-block__title" v-if="title">{{ title }}</h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ContentBlock',
    props: {
        title: String,
    },
};
</script>

<style lang="scss">
.content-block {
    background-color: #fff;
    padding: 18px;
    margin-bottom: 12px;
}

.content-block__title {
    font-size: $md-size;
    font-weight: 200;
    margin-bottom: 12px;
}
</style>
