import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: '/goods',
        name: 'goods',
        component: () =>
            import(/* webpackChunkName: "goods" */ '../views/Goods'),
    },
    {
        path: '/comment',
        name: 'comment',
        component: () =>
            import(/* webpackChunkName: "comment" */ '../views/Comment'),
    },
    {
        path: '/seller',
        name: 'seller',
        component: () =>
            import(/* webpackChunkName: "seller" */ '../views/Seller'),
    },
    {
        path: '/food/:name',
        name: 'food',
        props: true,
        component: () =>
            import(/* webpackChunkName: "seller" */ '../components/Food'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
