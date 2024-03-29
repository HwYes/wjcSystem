import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import './css/diyAntd.css'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
    router,
    store,
    render: function(h) {
        return h(App)
    },
}).$mount('#app')
