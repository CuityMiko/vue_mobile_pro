/**
 * 数据服务接口
 */
// 配置文件
import Config from '../js/config.js'
import httpHelper from '../js/commons/httpHelper.js'

export default{
    Getmoviedata(movietype,params){
        const apiurl=Config.apiurl.doubanurl.movie;
        const url=`${apiurl}/${movietype}`;
        return httpHelper.Jsonp(url,params);
    }
}