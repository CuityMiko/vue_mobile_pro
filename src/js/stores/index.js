/**
 * Vuex状态管理store的入口文件
 */

// state
import state from './states'

// mutations
import mutations from './mutations'

// actions
import actions from './actions'

// getters
import getters from './getters'


module.exports=(Vuex)=>{
    return new Vuex.Store({
        state,
        mutations,
        actions,
        getters
    })
}



