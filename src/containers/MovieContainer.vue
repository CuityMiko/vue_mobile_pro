<style scoped>
    .mint-tab-container-item{
        margin-bottom: 60px;
    }
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
    <div>
        <mt-navbar v-model="selected" :fixed="isfixed">
            <mt-tab-item id="1">正在热映</mt-tab-item>
            <mt-tab-item id="2">即将上映</mt-tab-item>
            <mt-tab-item id="3">口碑榜单</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" v-if="selected === '1'">
                <mt-loadmore :bottom-method="loaditBottom" :bottom-loaded="itLoaded" :bottom-all-loaded="itallLoaded" ref="itloadmore">
                <mt-cell-swipe
                    v-for="movie in in_theaters" :key="movie.id"
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
            </mt-tab-container-item>
            <mt-tab-container-item id="2" v-if="selected === '2'">
                <mt-cell-swipe
                    v-for="movie in coming_soons" :key="movie.id"
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
            </mt-tab-container-item>
            <mt-tab-container-item id="3" v-if="selected === '3'">
                <mt-cell-swipe
                    v-for="movie in top250s" :key="movie.id"
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
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
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
            selected:'1',
            isfixed:false,
            page:1,
            in_theaters:[],
            coming_soons:[],
            top250s:[],
            itallLoaded:false,
            itLoaded:false,
            itpageindex:2,
            cspageindex:2,
            toppageindex:2,
            itpagecount:1,
            cspagecount:1,
            toppagecount:1
        }
    },
    methods:{
        fixedTop(){
            window.onscroll= function(){
                //变量t是滚动条滚动时，距离顶部的距离
                var t = document.documentElement.scrollTop||document.body.scrollTop;
                //当滚动到距离顶部100px时，navbar置顶
                if(t>=100)
                    this.isfixed=true;
                else
                    this.isfixed=false;
            }.bind(this)
        },
        defaultTab(){
            switch (this.$route.params.type) {
                case "in_theaters":
                    this.selected="1";
                    break;
                case "coming_soon":
                    this.selected="2";
                    break;
                case "top250":
                    this.selected="3";
                    break;
                default:
                    this.selected="1";
                    break;
            }
        },
        initdata(){ // 初始化数据
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            let that=this;
            movieCacheData.in_theatersData().then((res)=>{
                that.itpagecount = Math.ceil(parseInt(res.total)/Config.page.pagesize);
                that.in_theaters=res.subjects;
            })
            movieCacheData.coming_soonData().then((res)=>{
                that.cspagecount = Math.ceil(parseInt(res.total)/Config.page.pagesize);
                that.coming_soons=res.subjects;
            })
            movieCacheData.top250Data().then((res)=>{
                Indicator.close();
                that.toppagecount = Math.ceil(parseInt(res.total)/Config.page.pagesize);
                that.top250s=res.subjects;
            })
        },
        // 正在热映上拉加载
        loaditBottom(){
            let _result = this.judgeToend('in_theaters');
            if(_result){
                this.itallLoaded = true; // 全部加载中
                this.$refs.itloadmore.onBottomLoaded();
                Toast('到底啦！');
            }else{
                let that=this;
                let _params={
                    pageindx:that.itpageindex
                }
                movieServices.Getmoviedata('in_theaters',_params).then((res)=>{
                    that.itLoaded=true; // 加载中
                    that.$refs.itloadmore.onBottomLoaded();
                    if(res.subjects.length>0){
                        let newarrs = that.$root.$data.lodash.concat(that.in_theaters,res.subjects)
                        that.in_theaters=newarrs;
                        that.itpageindex++;
                    }
                    else
                        Toast('数据加载失败！');
                },(err)=>{ 
                    that.itLoaded=true; // 加载中
                    that.$refs.itloadmore.onBottomLoaded();
                    Toast('数据加载失败！'); 
                })
                .catch((err)=>{ 
                    that.itLoaded=true; // 加载中
                    that.$refs.itloadmore.onBottomLoaded();
                    Toast('数据加载失败！'); 
                })
            }
        },
        // 分页
        getpageData(movietype){
            
            // movieServices.Getmoviedata(movietype,)
        },
        // 判断是否到底
        judgeToend(movietype){
            switch (movietype) {
                case 'in_theaters':
                    if(this.itpageindex>this.itpagecount)
                        return true
                    else
                        return false
                case 'coming_soon':
                    if(this.cspageindex>this.cspagecount)
                        return true
                    else
                        return false
                case 'top250':
                    if(this.toppageindex>this.toppagecount)
                        return true
                    else
                        return false
                default:
                    return false
            }
        }
    },
    mounted(){
        // 固定高度
        this.fixedTop();
        // 显示返回按钮
        this.$store.dispatch('showbackbtn');
        // 默认选中选项卡
        this.defaultTab();
        // 初始化数据
        this.initdata();
    }
}
</script>