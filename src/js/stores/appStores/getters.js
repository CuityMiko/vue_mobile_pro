/**
 * appStores -> getters
 * 返回状态值
 */

export default{
    // 是否显示头部
    isheader(state){
        return state.isheader;
    },
    // 是否显示底部
    isfooter(state){
        return state.isfooter;
    },
    // 是否显示返回按钮
    isback(state){
        return state.isback;
    }
}