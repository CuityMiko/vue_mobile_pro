/**
 * 缓存数据
 */
import commonCacheData from './commonCacheData.js'
import Cache from '../js/commons/cache.js'
import Enums from '../js/enums/'
import Config from '../js/config.js'
import movieServies from '../services/movieServices.js'

// 获取电影数据（初始化数据）
let movieData=(movietype)=>{
    return new Promise((resolve,reject)=>{
        const cache=new Cache(Enums.CACHEMODE.SESSION);
        const in_theaters = cache.GetData(movietype);
        if(in_theaters)
            resolve(in_theaters);
        else{
            commonCacheData.locationData().then((res)=>{
                let _params={
                    pageindex:1
                }
                movieServies.Getmoviedata(movietype,_params)
                    .then((result)=>{ 
                        cache.SetData(movietype,result);
                        resolve(result) 
                    },(err)=>{ reject(err) })
                    .catch((err)=>{ reject(err) });
            },(err)=>{
                reject(err)
            })
        }
    })
}

export default{
    // 正在热映
    in_theatersData(){
       return movieData('in_theaters');
    },
    // 即将上映
    coming_soonData(){
        return movieData('coming_soon');
    },
    // TOP250
    top250Data(){
        return movieData('top250');
    }
}