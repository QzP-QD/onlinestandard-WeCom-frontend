import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
    // 1. state
    state:{
        items: [],
        standardList: []
    },

    // // 2. getters
    getters:{
        // 参数列表state指的是state数据
        getitems(state){
            return state.items;
        },
        getstandardList(state){
            return state.standardList;
        }
    },
    // 3. actions
    // 通常跟api接口打交道
    actions:{
        // 设置信息
        // 参数列表：{commit, state}
        // state指的是state数据
        // commit调用mutations的方法
        // name就是调用此方法时要传的参数
        setitems({commit,state}, items){
            // 跟后台打交道
            // 调用mutaions里面的方法
            commit("setitems", items);
        },
        setstandardList({commit,state}, standardList){
            // 跟后台打交道
            // 调用mutaions里面的方法
            commit("setstandardList", standardList);
        }
    },
    // 4. mutations
    mutations:{
        // state指的是state的数据
        // name传递过来的数据
        setitems(state, items){
            state.items = items;//将传参设置给state
        },
        setstandardList(state, standardList){
            state.standardList = standardList;//将传参设置给state
        }
    }
});

export default store;
