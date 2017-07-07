/**
 * 数据服务接口
 */
// 配置文件
import Config from '../js/config.js'
import httpHelper from '../js/commons/httpHelper.js'
import commonCacheData from '../caches/commonCacheData.js'

export default{
    // 获取电影数据
    Getmoviedata(movietype,params){
        const apiurl=Config.apiurl.doubanurl.movie;
        const url=`${apiurl}/${movietype}`;
        return new Promise((resolve,reject)=>{
            commonCacheData.locationData().then((res)=>{
                let _params={
                    start:(params.pageindx-1)*Config.page.pagesize,
                    count:Config.page.pagesize,
                    city:res.city,
                    q:params.q || ''
                }
                httpHelper.Jsonp(url,_params)
                    .then((result)=>{ resolve(result) },(err)=>{ reject(err) })
                    .catch((err)=>{ reject(err) });
            },(err)=>{
                reject(err)
            })
        })
    },
    // 获取电影详情
    Getmoviedetail(id){
        const apiurl=Config.apiurl.doubanurl.movie;
        const url=`${apiurl}/subject/${id}`;
        return new Promise((resolve,reject)=>{
            let _params={}
            httpHelper.Jsonp(url,_params)
                .then((res)=>{ resolve(res) },(err)=>{ reject(err) })
                .catch((err)=>{ reject(err) });
        })
    }
}