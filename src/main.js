import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
    Row,
    Col,
    Button,
    Sidebar,
    SidebarItem,
    Card,
    Badge,
    Popup,
    Cell,
    CellGroup,
} from 'vant';

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Card);
Vue.use(Badge);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
