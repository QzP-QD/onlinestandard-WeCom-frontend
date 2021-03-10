// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from "vue-router"
import axios from 'axios'
import VueAxios from 'vue-axios'
//扫描路由配置
import router from "./router"

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false

//使用
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
