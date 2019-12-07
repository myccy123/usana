import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import urls from './config/urls'

Vue.config.productionTip = false;
Vue.use(ElementUI);

const globalBus = new Vue();

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$bus = globalBus;
Vue.prototype.$api = urls;

router.beforeEach((to, from, next) => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    if (flag) {
        if (to.name === 'doc_list') {
            next({
                name: 'doc_list_m'
            })
        }
    } else {
        if (to.name === 'doc_list_m') {
            next({
                name: 'doc_list'
            })
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        axios.get(urls.isLogin).then((res) => {
            if (!res.data.data.isLogin) {
                next({
                    path: '/signin',
                    query: {redirect: to.fullPath}
                })
            } else {
                next()
            }
        }).catch((res) => {
            next()
        })
    } else {
        next() // 确保一定要调用 next()
    }
});


// router.afterEach((to, from) => {
//     const u = navigator.userAgent.toLowerCase()
//     alert(to.fullPath)
//     alert(to.path)
//     alert(global.location.pathname)
//     if(u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger') return;
//     if (to.path !== global.location.pathname) {
//         // location.assign('/#' + to.fullPath)
//         global.location.pathname = '/#' + to.fullPath
//         alert(global.location.pathnam)
//     }
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
