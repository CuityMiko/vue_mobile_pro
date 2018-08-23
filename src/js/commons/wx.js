
/**
 * 封装weixin jssdk
 */
import wx from 'weixin-js-sdk'
import httpHelper from './httpHelper.js'

const _sdb_api_url = 'https://api.shundaibei.com';

module.exports = (Vue) => {
    // weixin jssdk
    Vue.prototype.$wecat = wx;
    var _wxsignatureurl = `${_sdb_api_url}/api/wx/signature`;
    httpHelper.Post(_wxsignatureurl, {url: window.location.origin, type: 'cj_test'}).then((res) => {
        if (res.success) {
            Vue.prototype.$wecat.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.result.appid, // 必填，公众号的唯一标识
                timestamp: res.result.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.result.noncestr, // 必填，生成签名的随机串
                signature: res.result.signature // 必填，签名
            })
            Vue.prototype.$wecatConf = res.result;
        }
    })
}
