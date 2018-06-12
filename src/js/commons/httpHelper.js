/**
 * http请求封装类（基于axios）
 */
import fetchJsonp from 'fetch-jsonp'
import axios from 'axios'
import qs from 'querystring'
// 配置文件
import Config from '../config.js' 

// axios的相关配置
// request：当发起请求的时候的配置
// axios.interceptors.request.use((conf)=>{
//     store.dispatch('showloading');
//     mapActions(['hidefooter'])
//     return conf;
// },(err)=>{
//     return Promise.reject(err);
// })

// response：当响应结果的时候的配置
// axios.interceptors.response.use((conf)=>{
//     store.dispatch('hideloading')
// },(err)=>{
//     return Promise.reject(err);
// })

// 配置请求的根路径
axios.defaults.baseURL=Config.apiurl.doubanurl;
// 设置默认的头部信息
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'; // post请求需要设置的头部信息

export default class HttpHelper{
    static that=new HttpHelper();

    /**
     * Get请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    static Get(url,params){
        return this.that.axiosGet(url,params);
    }

    /**
     * Post请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    static Post(url,params){
        return this.that.axiosPost(url,params);
    }

    /**
     * Jsonp请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*设置callback名称，默认callback} cbname 
     */
    static Jsonp(url,params,cbname='callback'){
        return this.that.commonJsonp(url,params,cbname);
    }

    /**
     * axios方式get请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    axiosGet(url,params){
        return new Promise((resolve, reject)=>{
            axios.get(url, {
                params:params
            })  
            .then((res) => {
                if (res.status==200 && res.statusText=="OK")
                    return res.data;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        })
    }

    /**
     * axios方式post请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    axiosPost(url,params){
        return new Promise((resolve, reject)=>{
            axios.post(url, qs.stringify(params)).then(function(res) {
                if (res.status==200 && res.statusText=="OK")
                    return res.data;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            }).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    /**
     * jsonp请求方式
     * @param {*请求url} url 
     * @param {*请求参数} params
     * @param {*设置callback名称，默认callback} cbname 
     */
    commonJsonp(url,params,cbname='callback'){
        return new Promise((resolve, reject)=>{
            let _url=url+"?"+qs.stringify(params);
            fetchJsonp(_url, {
                jsonpCallback: cbname,
            })
            .then(function(res) {
                if (res.ok)
                    return res.json();
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            }).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}