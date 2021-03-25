//导入vue
import Vue from 'vue'
import VueRouter from 'vue-router'

import StandardList from '../view/StandardList'
import MergeStandard from '../view/MergeStandard'
import Detail from '../view/Detail'

//使用
Vue.use(VueRouter);
//导出
export default new VueRouter({
    mode: 'history',
    routes:[
        {
            name:"MainPage",
            path:'/',
            component: StandardList,
            meta: {
                            keepAlive: true
                  }
        },
        {
            name:"DetailPage",
            path:'/detail',
            component:Detail
        },
        {
            name:"MergePage",
            path:'/merge',
            component:MergeStandard
        }
    ]
})