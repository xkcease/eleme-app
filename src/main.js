import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Row, Col, Button, Sidebar, SidebarItem, Card, Badge } from 'vant';

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Card);
Vue.use(Badge);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
