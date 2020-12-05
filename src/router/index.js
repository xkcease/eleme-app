import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: '/',
                alias: '/goods',
                name: 'goods',
                component: () => import(/* webpackChunkName: "goods" */ '../components/Goods')
            },
            {
                path: '/comment',
                name: 'comment',
                component: () => import(/* webpackChunkName: "comment" */ '../components/Comment')
            },
            {
                path: '/seller',
                name: 'seller',
                component: () => import(/* webpackChunkName: "seller" */ '../components/Seller')
            }
        ]
    },
    {
        path: "/detail/:id",
        name: "Detail",
        component: () =>
            import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
