/**
 * appStores -> mutations
 * 处理状态的变化
 * 1.变量作为方法名的时候需要给变量外面包一层“[]”
 */
import * as types from './types'

export default{
    // 显示头部
    [types.SHOWHEADER](state){
        state.isheader=true;
    },
    // 隐藏头部
    [types.HIDEHEADER](state){
        state.isheader=false;
    },

    // 显示头部
    [types.SHOWFOOTER](state){
        state.isfooter=true;
    },
    // 隐藏头部
    [types.HIDEFOOTER](state){
        state.isfooter=false;
    },

    // 显示返回按钮
    [types.SHOWBACKBTN](state){
        state.isback=true;
    },
    // 隐藏返回按钮
    [types.HIDEBACKBTN](state){
        state.isback=false;
    }
}