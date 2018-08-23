/**
 * 全局配置文件
 */
const _keys={
    bmapkey:'DOccg9buS8Vz1EngbQgfxvZvUNjI4Abl'
}
export default{
    server_url: 'http://192.168.0.102:10086',
    page:{
        pagesize:10
    },
    apiurl:{
        bmapurl:{
            getLocationUrl:`https://api.map.baidu.com/location/ip?ak=${_keys.bmapkey}&coor=bd09ll`
        },
        doubanurl:{
            movie:'https://api.douban.com/v2/movie'
        }
    }
}