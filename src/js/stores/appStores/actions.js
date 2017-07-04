/**
 * appStores -> actions
 */
import * as types from './types.js'

export default{
    // 显示头部
    [types.SHOWHEADER]:({ commit })=>{
        commit(types.SHOWHEADER);
    },

    // 隐藏头部
    [types.HIDEHEADER]:({ commit })=>{
        commit(types.HIDEHEADER);
    },

    // 显示底部
    [types.SHOWFOOTER]:({ commit })=>{
        commit(types.SHOWFOOTER);
    },

    // 隐藏底部
    [types.HIDEFOOTER]:({ commit })=>{
        commit(types.HIDEFOOTER);
    },

    // 显示返回按钮
    [types.SHOWBACKBTN]:({ commit })=>{
        commit(types.SHOWBACKBTN);
    },

    // 隐藏返回按钮
    [types.HIDEBACKBTN]:({ commit })=>{
        commit(types.HIDEBACKBTN);
    }
}