/**
 * 封装缓存类
 */
import Enums from '../enums/'

export default class Cache{
    constructor(mode){
        // 缓存方式
        this.mode=mode;
    }

    // 获取数据
    GetData(key){
        if(Enums.CACHEMODE.SESSION===this.mode){ // session存储模式
            let result=sessionStorage.getItem(key);
            if(result)
                return JSON.parse(result);
            else
                return null;
        }else if(Enums.CACHEMODE.LOCAL===this.mode){ // local存储模式
            let result=localStorage.getItem(key);
            if(result)
                return JSON.parse(result);
            else
                return null;
        }else
            return null;
    }

    // 存储数据
    SetData(key,value){
        if(Enums.CACHEMODE.SESSION===this.mode) // session存储模式
            sessionStorage.setItem(key,JSON.stringify(value));
        else if(Enums.CACHEMODE.LOCAL===this.mode) // local存储模式
            localStorage.setItem(key,JSON.stringify(value));
        else{}
    }

    // 删除数据
    DeleteData(key){
        if(Enums.CACHEMODE.SESSION===this.mode) // session存储模式
            sessionStorage.removeItem(key);
        else if(Enums.CACHEMODE.LOCAL===this.mode) // local存储模式
            localStorage.removeItem(key);
        else{}
    }
}