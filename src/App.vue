<template>
    <div id="app">
        <router-view />
        <Cart />
    </div>
</template>

<script>
import Cart from './components/Cart';

export default {
    components: {
        Cart,
    },
};
</script>

<style lang="scss">
</style>
