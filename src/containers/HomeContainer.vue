<style scoped>
    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }
    .home{
        margin-bottom: 55px;
    }
</style>

<template>
    <div class="home">
        <mt-cell title="正在热映" is-link to="/movie/in_theaters">
            <span>查看更多</span>
        </mt-cell>
        <div style="height:240px;">
            <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
                <mt-swipe-item v-for="movie in in_theaters" :key="movie.id">
                    <img :src="movie.images.medium" :alt="movie.title">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <mt-cell title="即将上映" is-link to="/movie/coming_soon">
            <span>查看更多</span>
        </mt-cell>
        <div style="height:240px;">
            <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
                <mt-swipe-item v-for="movie in coming_soons" :key="movie.id">
                    <img :src="movie.images.medium" :alt="movie.title">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <mt-cell title="口碑榜单" is-link to="/movie/top250">
            <span>查看更多</span>
        </mt-cell>
        <div style="height:240px;">
            <mt-swipe :continuous="false" :showIndicators="true" :auto="0">
                <mt-swipe-item v-for="movie in top250s" :key="movie.id">
                    <img :src="movie.images.medium" :alt="movie.title">
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
// 电影初始化缓存数据
import movieCacheData from '../caches/movieCacheData.js'
import { Indicator } from 'mint-ui';

export default {
    data(){
        return{
            title:'首页',
            in_theaters:[],
            coming_soons:[],
            top250s:[]
        }
    },
    methods:{
        initdata(){ // 初始化数据
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            let that=this;
            movieCacheData.in_theatersData().then((res)=>{
                that.in_theaters=res.subjects;
            })
            movieCacheData.coming_soonData().then((res)=>{
                that.coming_soons=res.subjects;
            })
            movieCacheData.top250Data().then((res)=>{
                Indicator.close();
                that.top250s=res.subjects;
            })
        }
    },
    mounted(){
        // 不显示返回按钮
        this.$store.dispatch('hidebackbtn');
        // 初始化数据
        this.initdata();
    }
}
</script>


