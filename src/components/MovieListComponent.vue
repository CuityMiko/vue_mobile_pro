<style scoped>
    .movieitem{
        padding: 10px;
        margin-left: -10px;
        display: flex;
        flex-direction: row;
    }
    .iteminfo{
        margin-left: 9px;
        display: flex;
        flex-direction: column;
    }
    .title{
        font-size: 18px;
    }
    .cls{
        margin-top: 9px;
        color:#696969;
    }
</style>

<template>
    <mt-loadmore :bottomPullText="'上拉刷新'" :bottomDropText="'释放更新'" :bottomLoadingText="'信息加载中,请耐心等待...'" :bottom-method="loadBottom" :bottom-loaded="Loaded" :bottom-all-loaded="allLoaded" ref="loadmore">
        <mt-cell-swipe
            v-for="movie in movielist" :key="movie.id"
            is-link
            :right="[
                {
                    content: '收藏',
                    style: { background: '#2E8B57', color: '#fff',padding:'39px 10px' },
                    handler: () => {
                        // this.$messagebox('添加')
                    }
                }
            ]">
            <div slot="icon" class="movieitem">
                <img :src="movie.images.small" :alt="movie.title">
                <div class="iteminfo">
                    <strong class="title">{{movie.title}}</strong>
                    <span class="cls">类型：{{movie.genres.join("、")}}</span>
                    <div class="cls">
                        导演：<span v-for="(director,index) in movie.directors" :key="director.id">{{director.name}}<span v-if="!(index==movie.directors.length-1)">、</span></span>
                    </div>
                    <span class="cls">上映时间：{{movie.year}}年</span>
                    <span class="cls">评分：<mt-badge type="error" v-if="movie.rating.average">{{movie.rating.average}}分</mt-badge><span style="color:#BEBEBE" v-else>暂无评分</span></span>
                </div>
            </div>
        </mt-cell-swipe>
    </mt-loadmore>
</template>

<script>
// 电影初始化缓存数据
import movieCacheData from '../caches/movieCacheData.js'
import movieServices from '../services/movieServices.js'
import Config from '../js/config.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
    data(){
        return{
            pageindex:2,
            pagecount:1,
            movielist:[],
            allLoaded:false,
            Loaded:false
        }
    },
    props:['movietype'],
    methods:{
        initdata(){ // 初始化数据
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            let that=this;
            switch (that.movietype) {
                case "in_theaters":
                    movieCacheData.in_theatersData().then((res)=>{
                        Indicator.close();
                        that.pagecount = Math.ceil(parseInt(res.total)/Config.page.pagesize);
                        that.movielist=res.subjects;
                    })
                    break;
                case "coming_soon":
                    movieCacheData.coming_soonData().then((res)=>{
                        Indicator.close();
                        that.pagecount = Math.ceil(parseInt(res.total)/Config.page.pagesize);
                        that.movielist=res.subjects;
                    })
                    break;
                case "top250":
                    movieCacheData.top250Data().then((res)=>{
                        Indicator.close();
                        that.pagecount = Math.ceil(parseInt(res.total)/Config.page.pagesize);
                        that.movielist=res.subjects;
                    })
                    break;
                default:
                    break;
            }    
        },
        // 正在热映上拉加载
        loadBottom(){
            let _result = this.judgeToend();
            if(_result){
                this.allLoaded = true; // 全部加载中
                this.$refs.loadmore.onBottomLoaded();
                Toast('到底啦！');
            }else{
                let that=this;
                let _params={
                    pageindx:that.pageindex
                }
                movieServices.Getmoviedata(that.movietype,_params).then((res)=>{
                    that.Loaded=true; // 加载中
                    that.$refs.loadmore.onBottomLoaded();
                    if(res.subjects.length>0){
                        let newarrs = that.$root.$data.lodash.concat(that.movielist,res.subjects)
                        that.movielist=newarrs;
                        that.pageindex++;
                    }
                    else
                        Toast('数据加载失败！');
                },(err)=>{ 
                    that.Loaded=true; // 加载中
                    that.$refs.loadmore.onBottomLoaded();
                    Toast('数据加载失败！'); 
                })
                .catch((err)=>{ 
                    that.Loaded=true; // 加载中
                    that.$refs.loadmore.onBottomLoaded();
                    Toast('数据加载失败！'); 
                })
            }
        },
        // 分页
        getpageData(movietype){
            
            // movieServices.Getmoviedata(movietype,)
        },
        // 判断是否到底
        judgeToend(){
            if(this.pageindex>this.pagecount)
                return true
            else
                return false
        }
    },
    mounted(){
        // 初始化数据
        this.initdata();
    }
}
</script>


