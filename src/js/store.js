/**
 * Vue的状态管理
 */
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

/**
 * state
 * 声明状态值
 */
const state={
    num:0
}


/**
 * mutations
 * 处理状态的变化
 */
const mutations={
    plus(state){
        state.num++;
    },
    minus(state){
        state.num--;
    }
}


/**
 * actions
 * 处理事件
 */
const actions={
    plus:({ commit })=>{
        commit('plus');
    },
    minus:({ commit })=>{
        commit('minus');
    },
    evenodd:({ commit,state })=>{
        if(state.num%2==0){
            commit('plus');
        }else{
            commit('minus');
        }
    }
}


/**
 * getters
 * 返回状态值
 */
const getters={
    num(state){
        return state.num;
    },
    isodd(state){
        return state.num%2==0?'偶数':'奇数';
    }
}


/**
 * export Vuex的Store对象
 */
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// })

module.exports=(Vuex)=>{
    return new Vuex.Store({
        state,
        mutations,
        actions,
        getters
    })
}