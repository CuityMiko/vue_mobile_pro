/**
 * 公共缓存数据
 */
import Util from '../js/commons/util.js'
import Enums from '../js/enums/'
import Cache from '../js/commons/cache.js'

export default{
    // 获取本地信息
    locationData(){
        const cache=new Cache(Enums.CACHEMODE.SESSION);
        const location = cache.GetData('location');
        return new Promise((resolve,reject)=>{
            if(location==null){
                Util.getLocation().then((res)=>{
                    cache.SetData('location',res);
                    resolve(res);
                },(err)=>{
                    reject(err);
                })
            }else{
                resolve(location)
            }
        })
    }
}