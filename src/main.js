// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from "vue-router"
import axios from 'axios'
import VueAxios from 'vue-axios'
//扫描路由配置
import router from "./router"
//导入pdf组件
import vueToPdf from 'vue-to-pdf'
import VanFieldSelectPicker from './components/VanFieldSelectPicker.vue'

import Vant from 'vant';
import 'vant/lib/index.css';
import {Button} from 'vant';
import { Card } from 'vant';
import { Image } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import { Col, Row } from 'vant';
import { Divider } from 'vant';

Vue.config.productionTip = false

//使用
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vant);
Vue.use(vueToPdf)
Vue.prototype.$axios = axios

Vue.component('van-field-select-picker',VanFieldSelectPicker)

//使用
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vant)
Vue.use(Button)
Vue.use(Card)
Vue.use(Image)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Field)
Vue.use(Col);
Vue.use(Row);
Vue.use(Divider);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
