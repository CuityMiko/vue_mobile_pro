/**
 * 工具类
 */
import Config from '../config.js'
import FetchApi from './fetchApi.js' 

export default class Util{
    /**
     * 获取本地信息
     */
    static getLocation(){
        return new Promise((resolve, reject)=>{
            FetchApi.fetch(Config.apiurl.bmapurl.getLocationUrl).then((res)=>{
                let _location={
                    province:res.content.address_detail.province,
                    city:res.content.address_detail.city.substring(0,res.content.address_detail.city.length-1),
                    city_code:res.content.address_detail.city_code,
                    address:res.content.address,
                    long:res.content.point.x,
                    lat:res.content.point.y
                }
                resolve(_location);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}